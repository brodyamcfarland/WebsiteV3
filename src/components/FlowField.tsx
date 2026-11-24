import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";

/**
 * Background: tens of thousands of silver particles streaming through a
 * curl-noise flow field, simulated entirely on the GPU (GPGPU ping-pong
 * textures via GPUComputationRenderer). Each texel stores one particle:
 * xy = position (aspect-corrected screen space), z = life, w = speed.
 *
 * Particles part and swirl around the mouse or a finger, and the whole
 * field drifts when you scroll. Fewer particles on phones; frozen (but
 * still drawn) when the visitor prefers reduced motion.
 */

const SIM = /* glsl */ `
  uniform float uTime;
  uniform float uDt;
  uniform float uAspect;
  uniform vec2 uMouse;
  uniform float uMouseOn;
  uniform float uScrollV;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float field(vec2 p) {
    return noise(p) + 0.5 * noise(p * 2.1 + 7.3);
  }
  // Divergence-free flow: rotate the gradient of a scalar noise field
  vec2 curl(vec2 p) {
    float e = 0.01;
    float dx = field(p + vec2(e, 0.0)) - field(p - vec2(e, 0.0));
    float dy = field(p + vec2(0.0, e)) - field(p - vec2(0.0, e));
    return vec2(dy, -dx) / (2.0 * e);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 s = texture2D(tPos, uv);
    vec2 p = s.xy;
    float seed = hash(uv * 91.7);

    vec2 v = curl(p * 1.15 + vec2(uTime * 0.02, -uTime * 0.015)) * 0.09;
    v += vec2(0.025, 0.006); // slow overall drift

    // Pointer: push away with a swirl
    vec2 d = p - uMouse;
    float r = length(d) + 1e-4;
    float k = smoothstep(0.32, 0.0, r) * uMouseOn;
    v += (d / r) * k * 0.8 + vec2(-d.y, d.x) / r * k * 0.5;

    v.y += uScrollV; // scroll parallax
    p += v * uDt;
    float life = s.z - uDt * (0.06 + seed * 0.1);

    bool outside = abs(p.x) > uAspect + 0.05 || abs(p.y) > 1.05;
    if (life <= 0.0 || outside) {
      // respawn somewhere random
      vec2 h = vec2(hash(uv + fract(uTime * 0.13)), hash(uv.yx + fract(uTime * 0.17)));
      p = vec2((h.x * 2.0 - 1.0) * uAspect, h.y * 2.0 - 1.0);
      life = 1.0;
    }
    gl_FragColor = vec4(p, life, length(v));
  }
`;

const VERT = /* glsl */ `
  uniform sampler2D tPos;
  uniform float uAspect;
  uniform float uPx;
  uniform float uClear; // 1 while the hero is on screen, 0 once scrolled past
  attribute vec2 aRef;
  varying float vAlpha;
  varying float vSpeed;
  void main() {
    vec4 s = texture2D(tPos, aRef);
    gl_Position = vec4(s.x / uAspect, s.y, 0.0, 1.0);
    float fade = sin(clamp(s.z, 0.0, 1.0) * 3.14159); // fade in and out over life
    vSpeed = clamp(s.w * 9.0, 0.0, 1.0);
    // Keep the hero's centre column (portrait + text) clean: particles thin
    // out inside a soft ellipse around it. On portrait screens (phones,
    // tablets) the content spans the full width, so the ellipse does too.
    float rx = uAspect < 1.0 ? uAspect * 1.15 : min(0.95, uAspect * 0.85);
    vec2 q = vec2(s.x / rx, s.y / 1.2);
    float clear = mix(0.08, 1.0, smoothstep(0.6, 1.05, length(q)));
    vAlpha = fade * (0.4 + vSpeed * 0.6) * mix(1.0, clear, uClear);
    gl_PointSize = uPx * (0.85 + vSpeed * 0.8);
  }
`;

const FRAG = /* glsl */ `
  varying float vAlpha;
  varying float vSpeed;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    // silver dust; the fastest streams pick up a hint of blue
    vec3 col = mix(vec3(0.72, 0.74, 0.8), vec3(0.62, 0.78, 1.0), vSpeed * vSpeed);
    gl_FragColor = vec4(col, vAlpha * smoothstep(0.5, 0.0, r));
  }
`;

// Particle grid sizes, highest quality first. Drops a tier if frames get slow.
const TIERS_DESKTOP = [192, 144, 104, 72]; // 36.9k .. 5.2k particles
const TIERS_PHONE = [112, 84, 64]; // 12.5k .. 4.1k particles

/** Can this GPU render into half-float textures (needed for the simulation)? */
function canSimulate(gl: THREE.WebGLRenderer) {
  const ctx = gl.getContext();
  const webgl2 = typeof WebGL2RenderingContext !== "undefined" && ctx instanceof WebGL2RenderingContext;
  return webgl2
    ? !!(ctx.getExtension("EXT_color_buffer_half_float") || ctx.getExtension("EXT_color_buffer_float"))
    : !!(ctx.getExtension("OES_texture_half_float") && ctx.getExtension("EXT_color_buffer_half_float"));
}

export default function FlowField() {
  const gl = useThree((s) => s.gl);
  const supported = useMemo(() => canSimulate(gl), [gl]);
  return supported ? <Flow /> : null;
}

function Flow() {
  const gl = useThree((s) => s.gl);
  const size = useThree((s) => s.size);
  const aspect = size.width / Math.max(1, size.height);
  const small = size.width < 768;
  const tiers = small ? TIERS_PHONE : TIERS_DESKTOP;
  const [tier, setTier] = useState(0);
  const N = tiers[Math.min(tier, tiers.length - 1)];
  const perf = useRef({ acc: 0, frames: 0, slow: 0, until: 4 });
  const mat = useRef<THREE.ShaderMaterial>(null);

  const pointer = useRef({ x: 0, y: 0, on: 0, target: 0 });
  const scroll = useRef({ last: 0, v: 0 });
  const reduce = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  // GPU simulation (rebuilt only if the particle count changes)
  const sim = useMemo(() => {
    const gpu = new GPUComputationRenderer(N, N, gl);
    gpu.setDataType(THREE.HalfFloatType); // widest mobile support
    const init = gpu.createTexture();
    const a = init.image.data as unknown as Float32Array;
    for (let i = 0; i < a.length; i += 4) {
      a[i] = (Math.random() * 2 - 1) * aspect;
      a[i + 1] = Math.random() * 2 - 1;
      a[i + 2] = Math.random();
      a[i + 3] = 0;
    }
    const variable = gpu.addVariable("tPos", SIM, init);
    gpu.setVariableDependencies(variable, [variable]);
    const u = variable.material.uniforms;
    u.uTime = { value: 0 };
    u.uDt = { value: 0.016 };
    u.uAspect = { value: aspect };
    u.uMouse = { value: new THREE.Vector2(99, 99) };
    u.uMouseOn = { value: 0 };
    u.uScrollV = { value: 0 };
    const error = gpu.init();
    if (process.env.NODE_ENV !== "production") console.debug("[flow] particles", N * N, error ?? "ok");
    if (error) {
      gpu.dispose();
      return null; // no float render targets: nebula alone is fine
    }
    return { gpu, variable };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, N]);
  useEffect(() => () => sim?.gpu.dispose(), [sim]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const ref = new Float32Array(N * N * 2);
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        const i = (y * N + x) * 2;
        ref[i] = (x + 0.5) / N;
        ref[i + 1] = (y + 0.5) / N;
      }
    g.setAttribute("aRef", new THREE.BufferAttribute(ref, 2));
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * N * 3), 3));
    return g;
  }, [N]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      tPos: { value: null as THREE.Texture | null },
      uAspect: { value: 1 },
      uPx: { value: 2 },
      uClear: { value: 1 },
    }),
    [],
  );

  // Mouse + touch, in the same aspect-corrected space as the simulation
  useEffect(() => {
    const set = (cx: number, cy: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      pointer.current.x = ((cx / w) * 2 - 1) * (w / h);
      pointer.current.y = -((cy / h) * 2 - 1);
      pointer.current.target = 1;
    };
    const onPointer = (e: PointerEvent) => set(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => e.touches[0] && set(e.touches[0].clientX, e.touches[0].clientY);
    const off = () => (pointer.current.target = 0);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", off, { passive: true });
    document.documentElement.addEventListener("pointerleave", off);
    scroll.current.last = window.scrollY;
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", off);
      document.documentElement.removeEventListener("pointerleave", off);
    };
  }, []);

  useFrame((state, delta) => {
    if (!sim) return;

    // Adaptive quality: average frame time over ~1s windows (ignoring the
    // first 4s of page load); three slow windows in a row (under ~40 fps)
    // drops to the next particle tier.
    const pf = perf.current;
    pf.acc += delta;
    pf.frames++;
    if (pf.acc > 1) {
      const avg = pf.acc / pf.frames;
      const warm = state.clock.elapsedTime > pf.until;
      pf.slow = warm && avg > 1 / 40 && !document.hidden ? pf.slow + 1 : 0;
      pf.acc = 0;
      pf.frames = 0;
      if (pf.slow >= 3 && tier < tiers.length - 1) {
        pf.slow = 0;
        pf.until = state.clock.elapsedTime + 4; // let the new tier settle
        setTier((t) => t + 1);
      }
    }

    const dt = Math.min(delta, 1 / 30);
    const u = sim.variable.material.uniforms;
    const p = pointer.current;
    p.on += (p.target - p.on) * Math.min(1, dt * 5);

    // Scroll velocity in screen-heights per second -> particles drift upward
    const y = window.scrollY;
    const raw = ((y - scroll.current.last) / window.innerHeight) * 2 / Math.max(dt, 1e-3);
    scroll.current.last = y;
    scroll.current.v += (Math.max(-3, Math.min(3, raw)) - scroll.current.v) * 0.2;

    if (!reduce) {
      u.uTime.value = state.clock.elapsedTime;
      u.uDt.value = dt;
      u.uAspect.value = aspect;
      u.uMouse.value.set(p.x, p.y);
      u.uMouseOn.value = p.on;
      u.uScrollV.value = scroll.current.v * 0.35;
      sim.gpu.compute();
    }
    // Write through the live material (R3F may hand it its own uniforms copy)
    const mu = mat.current?.uniforms;
    if (mu) {
      mu.tPos.value = sim.gpu.getCurrentRenderTarget(sim.variable).texture;
      mu.uAspect.value = aspect;
      mu.uPx.value = (small ? 2.6 : 2.4) * state.viewport.dpr;
      mu.uClear.value = 1 - Math.min(1, y / (window.innerHeight * 0.8));
    }
  });

  if (!sim) return null;
  return (
    <points geometry={geometry} frustumCulled={false} renderOrder={0}>
      <shaderMaterial
        ref={mat}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
