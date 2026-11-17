import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  color: string;
  type: 'star' | 'heart' | 'sparkle';
  rotation: number;
  rotationSpeed: number;
}

export const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
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

    const colors = [
      'rgba(244, 114, 182, ', // Pink
      'rgba(192, 132, 252, ', // Purple
      'rgba(251, 191, 36, ',  // Gold
      'rgba(255, 255, 255, ', // White
      'rgba(249, 168, 212, '  // Rose
    ];

    // Create 45 dreamy ambient particles
    const particleCount = Math.min(50, Math.floor((width * height) / 18000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const type: 'star' | 'heart' | 'sparkle' = 
        typeRand < 0.6 ? 'star' : typeRand < 0.85 ? 'heart' : 'sparkle';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'heart' ? Math.random() * 8 + 6 : Math.random() * 3.5 + 1.2,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.15, // float upward gently
        opacity: Math.random() * 0.6 + 0.2,
        maxOpacity: Math.random() * 0.5 + 0.35,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // Draw little heart helper
    const drawHeart = (context: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number, rotation: number) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      context.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      context.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.15);
      context.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      context.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      context.closePath();
      context.fillStyle = `${color}${opacity * 0.65})`;
      context.shadowColor = `${color}0.8)`;
      context.shadowBlur = 8;
      context.fill();
      context.restore();
    };

    const drawSparkle = (context: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      context.save();
      context.translate(x, y);
      context.fillStyle = `${color}${opacity})`;
      context.shadowColor = `${color}0.9)`;
      context.shadowBlur = 10;

      context.beginPath();
      for (let i = 0; i < 4; i++) {
        context.rotate(Math.PI / 2);
        context.lineTo(0, size * 2);
        context.lineTo(size * 0.3, size * 0.3);
      }
      context.closePath();
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around screen boundaries
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Twinkle opacity oscillation
        p.opacity += (Math.random() - 0.5) * 0.02;
        if (p.opacity < 0.15) p.opacity = 0.15;
        if (p.opacity > p.maxOpacity) p.opacity = p.maxOpacity;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, p.opacity);
        } else {
          // Soft glowing round star
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.shadowColor = `${p.color}0.7)`;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div id="particles-background-wrapper" className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Central Artistic Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(45,11,77,0.6)_0%,_transparent_70%)]" />

      {/* Floating Decorative Artistic Polaroids in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 md:opacity-60">
        {/* Top Left Polaroid */}
        <div className="absolute top-[8%] left-[4%] w-[110px] sm:w-[130px] h-[140px] sm:h-[160px] bg-white/10 backdrop-blur-md border border-white/20 rounded-sm p-2 rotate-[-12deg] shadow-2xl animate-float-slow">
          <div className="w-full h-[78%] bg-pink-200/20 mb-2 rounded-xs" />
          <div className="w-[60%] h-[3px] bg-white/25 rounded-full" />
        </div>

        {/* Mid Left Polaroid */}
        <div className="absolute top-[38%] left-[2%] w-[125px] sm:w-[145px] h-[160px] sm:h-[185px] bg-white/10 backdrop-blur-md border border-white/20 rounded-sm p-2 rotate-[5deg] shadow-2xl opacity-60 animate-float-slow" style={{ animationDelay: '-3s' }}>
          <div className="w-full h-[82%] bg-blue-200/20 mb-2 rounded-xs" />
          <div className="w-[45%] h-[3px] bg-white/25 rounded-full" />
        </div>

        {/* Bottom Left Polaroid */}
        <div className="absolute bottom-[10%] left-[6%] w-[105px] sm:w-[120px] h-[135px] sm:h-[150px] bg-white/10 backdrop-blur-md border border-white/20 rounded-sm p-2 rotate-[-8deg] shadow-2xl animate-float-slow" style={{ animationDelay: '-1.5s' }}>
          <div className="w-full h-[76%] bg-purple-200/20 mb-2 rounded-xs" />
          <div className="w-[65%] h-[3px] bg-white/25 rounded-full" />
        </div>

        {/* Top Right Polaroid */}
        <div className="absolute top-[6%] right-[4%] w-[130px] sm:w-[155px] h-[165px] sm:h-[195px] bg-white/10 backdrop-blur-md border border-white/20 rounded-sm p-2 rotate-[15deg] shadow-2xl opacity-80 animate-float-slow" style={{ animationDelay: '-4.5s' }}>
          <div className="w-full h-[82%] bg-pink-100/20 mb-2 rounded-xs" />
          <div className="w-[50%] h-[3px] bg-white/25 rounded-full" />
        </div>

        {/* Bottom Right Polaroid */}
        <div className="absolute bottom-[12%] right-[3%] w-[115px] sm:w-[135px] h-[145px] sm:h-[165px] bg-white/10 backdrop-blur-md border border-white/20 rounded-sm p-2 rotate-[-5deg] shadow-2xl animate-float-slow" style={{ animationDelay: '-2s' }}>
          <div className="w-full h-[78%] bg-indigo-200/20 mb-2 rounded-xs" />
          <div className="w-[60%] h-[3px] bg-white/25 rounded-full" />
        </div>

        {/* Glowing artistic light points */}
        <div className="absolute top-[20%] left-[25%] w-[4px] h-[4px] bg-pink-400 rounded-full shadow-[0_0_8px_#ff66cc]" />
        <div className="absolute top-[60%] left-[15%] w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_6px_#fff]" />
        <div className="absolute bottom-[30%] right-[20%] w-[5px] h-[5px] bg-pink-300 rounded-full shadow-[0_0_10px_#ff99cc]" />
        <div className="absolute top-[80%] right-[40%] w-[4px] h-[4px] bg-blue-400 rounded-full shadow-[0_0_8px_#33ccff]" />
      </div>

      {/* Floating Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
