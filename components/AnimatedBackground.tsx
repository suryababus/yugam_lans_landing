"use client";

import { useEffect, useRef } from "react";

const CELL = 80;
const BEAM_LEN = 140;
const SPOTLIGHT = 260;

type Beam = {
  axis: "x" | "y";
  line: number; // pixel position of the grid line the beam rides
  pos: number; // head position along the line
  speed: number;
  dir: 1 | -1;
  hue: "accent" | "neutral";
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let lastSpawn = 0;
    let beams: Beam[] = [];
    const cursor = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Grid lines are centered so the pattern stays balanced on any viewport
    const lines = (span: number) => {
      const offset = (span % CELL) / 2;
      const out: number[] = [];
      for (let p = offset; p <= span; p += CELL) out.push(Math.round(p) + 0.5);
      return out;
    };

    const drawGrid = (alpha: number) => {
      ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const x of lines(width)) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (const y of lines(height)) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const spawnBeam = () => {
      const axis: "x" | "y" = Math.random() < 0.6 ? "y" : "x";
      const rail = lines(axis === "y" ? width : height);
      const line = rail[Math.floor(Math.random() * rail.length)];
      const dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
      const span = axis === "y" ? height : width;
      beams.push({
        axis,
        line,
        dir,
        pos: dir === 1 ? -BEAM_LEN : span + BEAM_LEN,
        speed: 2 + Math.random() * 2.5,
        hue: Math.random() < 0.55 ? "accent" : "neutral",
      });
    };

    const drawBeam = (b: Beam) => {
      const tail = b.pos - BEAM_LEN * b.dir;
      const [x1, y1, x2, y2] =
        b.axis === "y"
          ? [b.line, tail, b.line, b.pos]
          : [tail, b.line, b.pos, b.line];
      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      const c = b.hue === "accent" ? "0, 113, 227" : "0, 0, 0";
      const peak = b.hue === "accent" ? 0.75 : 0.4;
      grad.addColorStop(0, `rgba(${c}, 0)`);
      grad.addColorStop(1, `rgba(${c}, ${peak})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      drawGrid(0.07);

      // Spotlight: redraw the grid brighter, clipped to a soft circle at the cursor
      if (cursor.x > -SPOTLIGHT) {
        ctx.save();
        const glow = ctx.createRadialGradient(
          cursor.x,
          cursor.y,
          0,
          cursor.x,
          cursor.y,
          SPOTLIGHT,
        );
        glow.addColorStop(0, "rgba(0, 0, 0, 1)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.globalCompositeOperation = "source-over";
        // Draw brighter grid through a radial alpha mask
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, SPOTLIGHT, 0, Math.PI * 2);
        ctx.clip();
        drawGrid(0.02); // additive pass; combined with base reads brighter
        ctx.strokeStyle = "rgba(0, 113, 227, 0.05)";
        drawGrid(0.03);
        ctx.restore();
      }

      if (!reducedMotion) {
        if (t - lastSpawn > 900 && beams.length < 6) {
          lastSpawn = t;
          spawnBeam();
        }
        for (const b of beams) {
          b.pos += b.speed * b.dir;
          drawBeam(b);
        }
        const gone = (b: Beam) => {
          const span = b.axis === "y" ? height : width;
          return b.dir === 1 ? b.pos - BEAM_LEN > span : b.pos + BEAM_LEN < 0;
        };
        beams = beams.filter((b) => !gone(b));
        raf = requestAnimationFrame(draw);
      }
    };

    const onMove = (e: PointerEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      if (reducedMotion) draw(0);
    };
    const onLeave = () => {
      cursor.x = -9999;
      cursor.y = -9999;
      if (reducedMotion) draw(0);
    };

    resize();
    draw(0);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Frosted glass over the animation */}
      <div className="absolute inset-0 bg-white/35 backdrop-blur-[3px]" />
    </div>
  );
}
