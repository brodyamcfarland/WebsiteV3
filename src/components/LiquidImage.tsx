import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * A project screenshot that turns to liquid under the mouse: a raw WebGL
 * overlay (no three.js) is created on hover, ripples the image around the
 * pointer with a slight RGB split, then eases out and is destroyed on leave.
 * Mouse only; touch devices and reduced-motion visitors get the plain image.
 *
 * The shader reproduces `object-cover object-top` so the overlay lines up
 * exactly with the <Image> underneath.
 */
const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform sampler2D uTex;
uniform vec2 uMouse;     // 0..1, y up
uniform vec2 uVel;       // pointer velocity
uniform float uStrength; // 0..1 hover intensity
uniform float uTime;
uniform float uCover;    // container aspect / image aspect
varying vec2 vUv;

vec2 cover(vec2 uv) {
  // object-cover + object-top
  if (uCover < 1.0) return vec2((uv.x - 0.5) * uCover + 0.5, uv.y);
  return vec2(uv.x, 1.0 - (1.0 - uv.y) / uCover);
}

void main() {
  vec2 uv = vUv;
  vec2 d = uv - uMouse;
  float dist = length(d);
  float falloff = smoothstep(0.45, 0.0, dist) * uStrength;

  // Concentric ripples radiating from the pointer + drag in the move direction
  float wave = sin(dist * 38.0 - uTime * 5.0) * 0.012;
  vec2 offset = normalize(d + 1e-4) * wave * falloff;
  offset -= uVel * falloff * 0.35;

  float split = (0.004 + length(uVel) * 0.08) * falloff;
  float r = texture2D(uTex, cover(uv + offset + vec2(split, 0.0))).r;
  float g = texture2D(uTex, cover(uv + offset)).g;
  float b = texture2D(uTex, cover(uv + offset - vec2(split, 0.0))).b;
  gl_FragColor = vec4(r, g, b, 1.0);
}`;

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export default function LiquidImage({ src, alt, priority, className = "" }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const host = el?.closest<HTMLElement>("[data-liquid-host]") ?? el?.parentElement;
    if (!el || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let canvas: HTMLCanvasElement | null = null;
    let gl: WebGLRenderingContext | null = null;
    let raf = 0;
    let hovering = false;
    let strength = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const vel = { x: 0, y: 0 };
    let loc: Record<string, WebGLUniformLocation | null> = {};
    const t0 = performance.now();

    const destroy = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
      canvas?.remove();
      canvas = null;
      gl = null;
    };

    const setup = () => {
      const image = img.current;
      if (!image || !image.complete || !image.naturalWidth) return false;
      canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.className = "liquid-canvas";
      gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: false });
      if (!gl) {
        canvas = null;
        return false;
      }
      const compile = (type: number, source: string) => {
        const s = gl!.createShader(type)!;
        gl!.shaderSource(s, source);
        gl!.compileShader(s);
        return s;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        destroy();
        return false;
      }
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const aPos = gl.getAttribLocation(prog, "aPos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      } catch {
        destroy();
        return false;
      }

      loc = Object.fromEntries(
        ["uTex", "uMouse", "uVel", "uStrength", "uTime", "uCover"].map((n) => [n, gl!.getUniformLocation(prog, n)]),
      );
      gl.uniform1i(loc.uTex, 0);
      el.appendChild(canvas);
      return true;
    };

    const frame = () => {
      if (!gl || !canvas) return;
      const image = img.current!;
      const w = el.clientWidth;
      const h = el.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
      strength += ((hovering ? 1 : 0) - strength) * 0.08;
      const px = mouse.x;
      const py = mouse.y;
      mouse.x += (mouse.tx - mouse.x) * 0.15;
      mouse.y += (mouse.ty - mouse.y) * 0.15;
      vel.x += (mouse.x - px - vel.x) * 0.3;
      vel.y += (mouse.y - py - vel.y) * 0.3;

      gl.uniform2f(loc.uMouse, mouse.x, mouse.y);
      gl.uniform2f(loc.uVel, vel.x, vel.y);
      gl.uniform1f(loc.uStrength, strength);
      gl.uniform1f(loc.uTime, (performance.now() - t0) / 1000);
      gl.uniform1f(loc.uCover, w / h / (image.naturalWidth / image.naturalHeight));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      canvas.style.opacity = String(Math.min(1, strength * 3));

      if (!hovering && strength < 0.01) {
        destroy();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const toLocal = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      hovering = true;
      toLocal(e);
      if (!gl) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
        if (!setup()) return;
      }
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => hovering && toLocal(e);
    const onLeave = () => (hovering = false);

    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      destroy();
    };
  }, []);

  return (
    <div ref={wrap} className={`absolute inset-0 ${className}`}>
      <Image
        ref={img}
        src={src}
        className="h-full w-full object-cover object-top"
        width={1200}
        height={800}
        alt={alt}
        priority={priority}
      />
    </div>
  );
}
