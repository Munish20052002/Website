"use client";

import { useEffect, useState } from "react";

const EMOJIS = ["❤️", "💋", "🤗", "💕", "💖", "😘", "🥰", "💗", "💞", "🦉", "💌", "✨", "💝", "🫶"];

interface Particle {
  id: number;
  emoji: string;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  swayAmount: number;
}

export default function FloatingParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate 35 particles spread across the viewport
  const particles: Particle[] = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    emoji: EMOJIS[i % EMOJIS.length],
    left: ((i * 19 + 3) % 96) + 2,
    size: 16 + (i % 6) * 5,
    delay: (i * 1.3) % 18,
    duration: 15 + (i % 10) * 3,
    opacity: 0.12 + (i % 5) * 0.06,
    swayAmount: 20 + (i % 4) * 15,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            bottom: "-8%",
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `drift ${p.duration}s linear ${p.delay}s infinite`,
            filter: "blur(0.3px)",
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
