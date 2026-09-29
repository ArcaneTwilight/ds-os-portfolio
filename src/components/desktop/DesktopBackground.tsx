import React, { useEffect, useRef } from 'react';
import { WallpaperId } from '../../types/os';

interface DesktopBackgroundProps {
  wallpaper: WallpaperId;
  showGrid: boolean;
  particlesEnabled: boolean;
  contrast: number;
}

export const DesktopBackground: React.FC<DesktopBackgroundProps> = ({
  wallpaper,
  showGrid,
  particlesEnabled,
  contrast
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Wallpaper gradient styles
  const getWallpaperBackground = () => {
    switch (wallpaper) {
      case 'aurora':
        return 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16, 185, 129, 0.22), transparent 70%), radial-gradient(ellipse 60% 50% at 90% 80%, rgba(56, 189, 248, 0.18), transparent 70%), radial-gradient(ellipse 60% 60% at 10% 70%, rgba(99, 102, 241, 0.2), transparent 70%), #030712';
      case 'cyberpunk':
        return 'radial-gradient(ellipse 70% 60% at 30% 20%, rgba(168, 85, 247, 0.2), transparent 60%), radial-gradient(ellipse 60% 60% at 80% 70%, rgba(236, 72, 153, 0.16), transparent 70%), radial-gradient(ellipse 50% 50% at 50% 100%, rgba(30, 27, 75, 0.8), transparent 80%), #09090b';
      case 'deep-space':
        return 'radial-gradient(circle 800px at 50% 40%, rgba(67, 56, 202, 0.15), transparent 70%), radial-gradient(circle 600px at 15% 15%, rgba(14, 165, 233, 0.12), transparent 60%), #020617';
      case 'slate':
        return 'radial-gradient(ellipse 80% 70% at 50% 30%, rgba(71, 85, 105, 0.25), transparent 80%), radial-gradient(ellipse 60% 40% at 20% 90%, rgba(51, 65, 85, 0.2), transparent 70%), #0b0f17';
      case 'sunset':
        return 'radial-gradient(ellipse 90% 70% at 50% 90%, rgba(245, 158, 11, 0.18), transparent 70%), radial-gradient(ellipse 70% 50% at 80% 30%, rgba(225, 29, 72, 0.16), transparent 70%), radial-gradient(ellipse 70% 60% at 20% 40%, rgba(124, 58, 237, 0.18), transparent 70%), #090514';
      default:
        return '#030712';
    }
  };

  // Canvas particle drift animation
  useEffect(() => {
    if (!particlesEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle setup
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.15,
      targetAlpha: Math.random() * 0.5 + 0.2
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connection lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.08;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(180, 205, 245, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Subtle gentle drift toward mouse influence
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        if (distToMouse < 180 && distToMouse > 0) {
          const force = (1 - distToMouse / 180) * 0.04;
          p.x += (dx / distToMouse) * force;
          p.y += (dy / distToMouse) * force;
        }

        // Boundary wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 235, 255, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particlesEnabled]);

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none transition-all duration-700 overflow-hidden"
      style={{
        background: getWallpaperBackground(),
        filter: `contrast(${contrast}%)`
      }}
    >
      {/* Subtle Atmospheric Gradient Blobs */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />

      {/* Grid Pattern */}
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px'
          }}
        />
      )}

      {/* Canvas for dynamic particles */}
      {particlesEnabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      )}
    </div>
  );
};
