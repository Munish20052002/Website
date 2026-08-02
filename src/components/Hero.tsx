"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HER_NICKNAME, HERO_SUBTITLE, HERO_BUTTON_TEXT } from "@/utils/constants";

export default function Hero() {
  const letters = HER_NICKNAME.split("");

  const handleScroll = () => {
    const apologySection = document.getElementById("apology");
    if (apologySection) {
      apologySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #1a0a10 0%, #0a0a0f 50%, #050508 100%)",
      }}
    >
      {/* Subtle owl silhouette in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 200 200"
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] text-wine/[0.04]"
          fill="currentColor"
        >
          <path d="M100 20C60 20 40 50 40 80c0 14 4 26 10 36l-16 64c-1 4 3 7 6 5l20-10c10 6 20 10 32 10h16c12 0 22-4 32-10l20 10c3 2 7-1 6-5l-16-64c6-10 10-22 10-36 0-30-20-60-60-60zm-24 52a12 12 0 110 24 12 12 0 010-24zm48 0a12 12 0 110 24 12 12 0 010-24zm-24 36c-8 0-14-3-14-6h28c0 3-6 6-14 6z" />
        </svg>
      </div>

      {/* Name — letter by letter animation */}
      <motion.div
        className="relative z-20 text-center"
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-rose-light/60 text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-inter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Happy Girlfriend&apos;s Day
        </motion.p>

        <h1 className="font-playfair text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block bg-gradient-to-b from-cream via-rose-light to-rose bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8 + i * 0.12,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Typewriter subtitle */}
        <motion.div
          className="mt-6 md:mt-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <p className="font-inter text-lg md:text-xl text-rose/70 italic">
            {HERO_SUBTITLE.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 2.0 + i * 0.04,
                  duration: 0.1,
                }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              className="inline-block w-[2px] h-5 bg-rose-light/70 ml-1 align-middle"
              style={{ animation: "typewriter-blink 1s step-end infinite" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
            />
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={handleScroll}
          className="mt-10 md:mt-12 px-8 py-3.5 rounded-full
            bg-gradient-to-r from-wine to-crimson
            text-cream font-inter text-base md:text-lg font-medium
            animate-pulse-glow cursor-pointer
            hover:from-crimson hover:to-crimson-light
            transition-all duration-500 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {HERO_BUTTON_TEXT}
          <ChevronDown className="inline-block ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </motion.div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight to-transparent" />
    </section>
  );
}
