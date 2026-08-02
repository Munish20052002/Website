"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  CLOSING_PARAGRAPHS,
  CLOSING_SIGN_OFF,
  CLOSING_NAME,
  HER_NICKNAME,
} from "@/utils/constants";

function ConfettiParticle({ index }: { index: number }) {
  // Deterministic but varied positions
  const angle = (index / 30) * Math.PI * 2;
  const distance = 40 + (index * 37) % 180;
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance - 80;
  const size = 4 + (index % 5) * 2;
  const colors = [
    "#d4a853",
    "#c0354d",
    "#9b2335",
    "#e8a8b4",
    "#f5d5d5",
    "#e8c97a",
  ];
  const color = colors[index % colors.length];
  const rotation = index * 47;
  const delay = (index * 0.02) % 0.6;

  return (
    <motion.div
      className="absolute rounded-sm"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: "50%",
        top: "40%",
      }}
      initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        x,
        y,
        opacity: 0,
        rotate: rotation,
        scale: 0,
      }}
      transition={{
        duration: 1.5 + (index % 5) * 0.2,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

export default function ClosingNote() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const triggerConfetti = useCallback(() => {
    if (hasTriggered) return;
    setHasTriggered(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, [hasTriggered]);

  // Trigger confetti when section comes into view
  useEffect(() => {
    const section = document.getElementById("closing");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerConfetti();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [triggerConfetti]);

  return (
    <section
      id="closing"
      className="relative min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #42262f 0%, #5c2a3a 30%, #7a3345 60%, #8a3b4e 80%, #4a2030 100%)",
      }}
    >
      {/* Floating nickname in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <motion.span
          className="font-playfair text-[70px] sm:text-[140px] md:text-[200px] lg:text-[280px] text-cream/[0.03] select-none whitespace-nowrap"
          animate={{
            y: [0, -15, 0],
            rotate: [-2, 1, -2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {HER_NICKNAME}
        </motion.span>
      </div>

      {/* Confetti burst */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {Array.from({ length: 30 }, (_, i) => (
            <ConfettiParticle key={i} index={i} />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        className="relative z-20 max-w-2xl text-center px-2"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Owl icon */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <span className="text-4xl sm:text-5xl md:text-6xl">🦉</span>
        </motion.div>

        {/* Closing paragraphs */}
        <div className="space-y-4 sm:space-y-6">
          {CLOSING_PARAGRAPHS.map((paragraph, i) => (
            <motion.p
              key={i}
              className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl text-cream/95 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.6 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Sign off */}
        <motion.div
          className="mt-8 sm:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="font-inter text-rose-light/70 text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2">
            {CLOSING_SIGN_OFF}
          </p>
          <p className="font-playfair text-xl sm:text-2xl md:text-3xl text-gold italic">
            {CLOSING_NAME}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
