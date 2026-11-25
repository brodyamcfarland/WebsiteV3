import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { isPhone } from "../lib/device";

/**
 * The hero portrait, rebuilt from thousands of glowing particles sampled from
 * /heroimage.png. They fly in and assemble on load, swirl away from the
 * pointer (mouse or finger), and scatter outward into the starfield as you
 * scroll down. Rendered with a custom point shader, additive blending.
 *
 * The canvas is larger than the portrait (see `OVERSCAN`) so scattered
 * particles aren't clipped at the circle's edge.
 */
export const OVERSCAN = 1.9;
/** How much bigger than the portrait slot the particle figure is drawn. */
const SIZE = 1.3;

type Sample = { target: Float32Array; start: Float32Array; lum: Float32Array; rand: Float32Array; count: number };

async function samplePortrait(grid: number): Promise<Sample> {
  const img = new Image();
  img.src = "/heroimage.png";
  await img.decode();
  const c = document.createElement("canvas");
  c.width = c.height = grid;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  // Match the original circular crop (object-cover in a circle)
  ctx.drawImage(img, 0, 0, grid, grid);
  const { data } = ctx.getImageData(0, 0, grid, grid);

  const target: number[] = [];
  const lum: number[] = [];
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      const i = (y * grid + x) * 4;
      if (data[i + 3] < 120) continue;
      const u = x / grid - 0.5;
      const v = 0.5 - y / grid;
      const l = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
      target.push(u + (Math.random() - 0.5) / grid, v + (Math.random() - 0.5) / grid, 0);
      lum.push(l);
    }
  }
  const count = lum.length;
  const start = new Float32Array(count * 3);
  const rand = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    // Start on a wide random shell so they "fly in" from all around
    const a = Math.random() * Math.PI * 2;
    const r = 0.7 + Math.random() * 0.9;
    start[i * 3] = Math.cos(a) * r;
    start[i * 3 + 1] = Math.sin(a) * r;
    start[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    rand[i] = Math.random();
  }
  return { target: new Float32Array(target), start, lum: new Float32Array(lum), rand, count };
}

const vertex = /* glsl */ `
  attribute vec3 aTarget;
  attribute vec3 aStart;
  attribute float aLum;
  attribute float aRand;
  uniform float uTime;
  uniform float uIntro;
  uniform float uScatter;
  uniform float uScale;
  uniform float uPx;
  uniform vec2 uMouse;
  uniform float uForce;
  varying float vAlpha;
  varying float vLum;

  void main() {
    // Staggered assembly: each particle has its own arrival time
    float d = clamp(uIntro * 1.5 - aRand * 0.5, 0.0, 1.0);
    float e = 1.0 - pow(1.0 - d, 3.0);
    vec3 p = mix(aStart, aTarget, e) * uScale;

    // Idle shimmer
    p.xy += vec2(sin(uTime * 1.3 + aRand * 40.0), cos(uTime * 1.1 + aRand * 30.0)) * 0.7;

    // Pointer: push particles away with a little swirl
    vec2 diff = p.xy - uMouse;
    float dist = length(diff);
    float f = smoothstep(uScale * 0.22, 0.0, dist) * uForce;
    vec2 dir = diff / max(dist, 0.001);
    p.xy += (dir + vec2(-dir.y, dir.x) * 0.6) * f * uScale * 0.09;

    // Scroll: burst outward into the starfield
    vec3 outward = normalize(aStart + vec3(0.0001));
    p += outward * uScatter * uScale * (0.5 + aRand * 1.6);
    p.z += uScatter * (aRand - 0.5) * uScale;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uPx * (0.75 + aLum * 0.7) * (1.0 + uScatter * 0.6);
    vLum = aLum;
    vAlpha = (0.12 + aLum * 0.6) * (1.0 - uScatter * 0.85) * smoothstep(0.0, 0.25, uIntro);
    // Fade out in a circle before the canvas's square edge, so particles
    // flying in or scattering never reveal a hard box outline
    // (the assembled figure spans about +/-0.68 of the canvas, so it's untouched)
    vec2 ndc = abs(gl_Position.xy / gl_Position.w);
    vAlpha *= smoothstep(1.0, 0.72, max(ndc.x, ndc.y)) * smoothstep(1.3, 0.97, length(ndc));
  }
`;

const fragment = /* glsl */ `
  varying float vAlpha;
  varying float vLum;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.3, r); // crisp dot, slightly feathered edge
    // Cool grey shadows with a faint blue cast, near-white highlights
    vec3 col = mix(vec3(0.5, 0.58, 0.74), vec3(0.97, 0.98, 1.0), smoothstep(0.25, 0.85, vLum));
    gl_FragColor = vec4(col, vAlpha * soft);
  }
`;

function Points({ sample, onReady }: { sample: Sample; onReady: () => void }) {


  const mat = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef({ x: 9999, y: 9999, active: false });
  const t0 = useRef<number | null>(null);
  const readied = useRef(false);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(sample.target, 3));
    g.setAttribute("aTarget", new THREE.BufferAttribute(sample.target, 3));
    g.setAttribute("aStart", new THREE.BufferAttribute(sample.start, 3));
    g.setAttribute("aLum", new THREE.BufferAttribute(sample.lum, 1));
    g.setAttribute("aRand", new THREE.BufferAttribute(sample.rand, 1));
    return g;
  }, [sample]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uScatter: { value: 0 },
      uScale: { value: 1 },
      uPx: { value: 2 },
      uMouse: { value: new THREE.Vector2(9999, 9999) },
      uForce: { value: 0 },
    }),
    [],
  );

  // Pointer + touch, tracked on window so the canvas can stay pointer-events:none
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const set = (cx: number, cy: number) => {
      const r = canvas.getBoundingClientRect();
      pointer.current.x = cx - (r.left + r.width / 2);
      pointer.current.y = r.top + r.height / 2 - cy;
      pointer.current.active = true;
    };
    const onPointer = (e: PointerEvent) => set(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => e.touches[0] && set(e.touches[0].clientX, e.touches[0].clientY);
    const off = () => (pointer.current.active = false);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", off, { passive: true });
    document.addEventListener("pointerleave", off);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", off);
      document.removeEventListener("pointerleave", off);
    };
  }, [gl]);

  useFrame((state, dt) => {
    const m = mat.current;
    if (!m) return;
    if (t0.current === null) t0.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - t0.current;
    const u = m.uniforms;
    const portrait = (state.size.width / OVERSCAN) * SIZE; // figure size in px (read per frame: no re-render on resize)
    u.uTime.value = t;
    u.uIntro.value = Math.min(1, t / 2.4);
    u.uScale.value = portrait;
    u.uPx.value = Math.max(1.6, (portrait / Math.sqrt(sample.count)) * 1.25) * state.viewport.dpr;
    const scatter = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.75)));
    u.uScatter.value += (scatter - u.uScatter.value) * Math.min(1, dt * 6);
    u.uMouse.value.set(pointer.current.x, pointer.current.y);
    const want = pointer.current.active ? 1 : 0;
    u.uForce.value += (want - u.uForce.value) * Math.min(1, dt * 4);
    if (!readied.current && t > 0.05) {
      readied.current = true;
      onReady();
    }
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticlePortrait({ onReady }: { onReady: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [sample, setSample] = useState<Sample | null>(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let alive = true;
    const mobile = isPhone() || window.matchMedia("(max-width: 767px)").matches;
    samplePortrait(mobile ? 150 : 165)
      .then((s) => alive && setSample(s))
      .catch(() => {}); // keep the static image if anything goes wrong
    return () => {
      alive = false;
    };
  }, []);

  // Stop rendering once it's scrolled off screen
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden
      className="pointer-events-none absolute z-10"
      style={{ inset: `${(-(OVERSCAN - 1) / 2) * 100}%` }}
    >
      {sample && (
        <Canvas
          orthographic
          camera={{ position: [0, 0, 500], zoom: 1, near: 0.1, far: 2000 }}
          dpr={[1, 3]}
          frameloop={running ? "always" : "never"}
          gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
          style={{ pointerEvents: "none" }}
        >
          <Points sample={sample} onReady={onReady} />
        </Canvas>
      )}
    </div>
  );
}
