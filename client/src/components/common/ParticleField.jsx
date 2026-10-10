import { useEffect, useRef } from 'react';

// Circuit-node field — echoes the logo: cyan traces with amber node accents.
// Pass `tone="cyan" | "amber" | "duo"` or a custom hex via `color`.
const PALETTE = {
  cyan: [34, 211, 238],
  amber: [255, 178, 36],
};

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  if (h.length < 6) return PALETTE.cyan;
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

export default function ParticleField({ color = null, tone = 'duo', count = 42, speed = 0.28, linkDist = 110 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const pickColor = () => {
      if (color) return hexToRgb(color);
      if (tone === 'amber') return PALETTE.amber;
      if (tone === 'cyan') return PALETTE.cyan;
      return Math.random() < 0.22 ? PALETTE.amber : PALETTE.cyan; // duo: mostly cyan, amber accents
    };

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * (w || window.innerWidth),
      y: Math.random() * (h || window.innerHeight),
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      r: Math.random() * 1.8 + 0.6,
      o: Math.random() * 0.45 + 0.25,
      c: pickColor(),
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // links first (circuit traces)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            const [r, g, bl] = a.c;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${(1 - dist / linkDist) * 0.16})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      // nodes with soft glow
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const [r, g, b] = p.c;
        const twinkle = p.o * (0.75 + 0.25 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${twinkle * 0.18})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${twinkle})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [color, tone, count, speed, linkDist]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ position: 'fixed', zIndex: 0 }} />;
}
