import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Full-screen nebula drawn behind the stars with a hand-written fragment
 * shader: layered fractal noise drifting slowly in soft graphite with a
 * cool tint, and a soft blue glow that follows the cursor. Cheaper (fewer noise
 * octaves) on small screens.
 */
const fragment = (octaves: number) => /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < ${octaves}; i++) { v += a * noise(p); p = r * p * 2.0; a *= 0.5; }
    return v;
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
    vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
    p -= m * 0.06; // gentle parallax toward the cursor

    float t = uTime * 0.025;
    vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 3.1));
    float n = fbm(p * 2.0 + q * 1.6 + vec2(t * 0.6, -t * 0.4));

    vec3 col = vec3(0.027, 0.027, 0.031);
    col += vec3(0.55, 0.6, 0.7) * pow(n, 3.2) * 0.22;  // graphite clouds
    col += vec3(0.04, 0.06, 0.13) * pow(q.x, 3.0) * 0.25; // faint cool undertone
    col += vec3(0.36, 0.6, 1.0) * 0.06 * smoothstep(0.55, 0.0, length(p - m + m * 0.06)); // cursor glow

    // Vignette keeps the edges ink-dark so content stays readable
    col *= smoothstep(1.25, 0.25, length((vUv - 0.5) * vec2(aspect * 0.9, 1.2)));
    gl_FragColor = vec4(col, 1.0);
  }
`;

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.9999, 1.0); // screen-space quad, always behind
  }
`;

export default function Nebula() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const size = useThree((s) => s.size);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const small = size.width < 768;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [],
  );

  useEffect(() => {
    const on = (e: PointerEvent) =>
      mouse.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, []);

  useFrame((state, dt) => {
    const u = mat.current?.uniforms;
    if (!u) return;
    u.uTime.value = state.clock.elapsedTime;
    u.uRes.value.set(size.width, size.height);
    u.uMouse.value.lerp(mouse.current, Math.min(1, dt * 2.5));
  });

  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        key={small ? "s" : "l"}
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment(small ? 4 : 5)}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
