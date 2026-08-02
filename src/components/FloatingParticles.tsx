"use client";

import { useEffect, useState } from "react";

export default function FloatingParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate particles with fixed positions (seeded by index)
  const particles = Array.from({ length: 18 }, (_, i) => {
    const isOwl = i % 4 === 0;
    const size = isOwl ? 20 + (i % 3) * 8 : 10 + (i % 5) * 4;
    const left = ((i * 17 + 5) % 95) + 2; // spread across viewport
    const delay = (i * 1.7) % 12;
    const duration = 20 + (i % 8) * 5;
    const opacity = isOwl ? 0.06 : 0.04 + (i % 4) * 0.015;

    return { id: i, isOwl, size, left, delay, duration, opacity };
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `drift ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.isOwl ? (
            /* Owl silhouette SVG */
            <svg viewBox="0 0 64 64" fill="currentColor" className="text-rose-light w-full h-full">
              <path d="M32 4C20 4 14 14 14 24c0 4 1 7 3 10l-5 20c0 2 2 4 4 3l6-3c3 2 6 3 10 3s7-1 10-3l6 3c2 1 4-1 4-3l-5-20c2-3 3-6 3-10 0-10-6-20-18-20zm-8 18a4 4 0 110 8 4 4 0 010-8zm16 0a4 4 0 110 8 4 4 0 010-8zm-8 14c-3 0-5-1-5-2h10c0 1-2 2-5 2z" />
            </svg>
          ) : (
            /* Rose petal / heart shape */
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-crimson w-full h-full">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
