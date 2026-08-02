"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HER_NICKNAME, HERO_SUBTITLE, HERO_BUTTON_TEXT } from "@/utils/constants";

// Sparkle/star decorations
function Sparkle({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gold/30">
        <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
      </svg>
    </motion.div>
  );
}

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
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, #1f0a14 0%, #120810 30%, #0a0a0f 60%, #050508 100%)",
      }}
    >
      {/* Animated gradient orbs in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-[150px] -left-[150px] sm:-top-[200px] sm:-left-[200px] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(155, 35, 53, 0.12) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[150px] -right-[150px] sm:-bottom-[200px] sm:-right-[200px] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(92, 26, 42, 0.15) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212, 168, 83, 0.04) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Sparkle decorations */}
      <Sparkle className="top-[15%] left-[8%]" delay={0} />
      <Sparkle className="top-[25%] right-[10%]" delay={1.2} />
      <Sparkle className="bottom-[30%] left-[15%]" delay={0.6} />
      <Sparkle className="top-[40%] right-[18%]" delay={2} />
      <Sparkle className="bottom-[20%] right-[8%]" delay={1.5} />
      <Sparkle className="top-[60%] left-[6%]" delay={0.8} />

      {/* Subtle owl silhouette in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.svg
          viewBox="0 0 200 200"
          className="w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] md:w-[500px] md:h-[500px] text-wine/[0.04]"
          fill="currentColor"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M100 20C60 20 40 50 40 80c0 14 4 26 10 36l-16 64c-1 4 3 7 6 5l20-10c10 6 20 10 32 10h16c12 0 22-4 32-10l20 10c3 2 7-1 6-5l-16-64c6-10 10-22 10-36 0-30-20-60-60-60zm-24 52a12 12 0 110 24 12 12 0 010-24zm48 0a12 12 0 110 24 12 12 0 010-24zm-24 36c-8 0-14-3-14-6h28c0 3-6 6-14 6z" />
        </motion.svg>
      </div>

      {/* Horizontal decorative lines */}
      <motion.div
        className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-wine/10 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
      />
      <motion.div
        className="absolute bottom-[25%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/5 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 2 }}
      />

      {/* Name — letter by letter animation */}
      <motion.div
        className="relative z-20 text-center max-w-lg mx-auto"
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-rose-light/60 text-[11px] sm:text-xs md:text-sm tracking-[0.35em] sm:tracking-[0.4em] uppercase mb-4 sm:mb-6 font-inter"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          ── Happy Girlfriend&apos;s Day ──
        </motion.p>

        <h1 className="font-playfair text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tight leading-none">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              style={{
                background: "linear-gradient(180deg, #faf3ee 0%, #e8a8b4 50%, #d47c8a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0, y: 60, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.8 + i * 0.15,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
          {/* Small owl emoji after the name */}
          <motion.span
            className="inline-block text-3xl sm:text-4xl md:text-5xl ml-1 sm:ml-2 align-middle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
          >
            🦉
          </motion.span>
        </h1>

        {/* Decorative line under name */}
        <motion.div
          className="mx-auto mt-3 sm:mt-4 h-px w-24 sm:w-32 md:w-48 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        />

        {/* Typewriter subtitle */}
        <motion.div
          className="mt-6 sm:mt-8 md:mt-10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <p className="font-inter text-base sm:text-lg md:text-xl text-rose/70 italic px-2">
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
              className="inline-block w-[2px] h-4 sm:h-5 bg-rose-light/70 ml-1 align-middle"
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
          className="mt-10 sm:mt-12 md:mt-14 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full
            bg-gradient-to-r from-wine via-crimson to-wine
            text-cream font-inter text-base md:text-lg font-medium
            cursor-pointer relative overflow-hidden
            border border-crimson/30
            transition-all duration-500 group touch-manipulation"
          style={{
            boxShadow: "0 0 30px rgba(155, 35, 53, 0.35), 0 0 60px rgba(155, 35, 53, 0.12), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 40px rgba(155, 35, 53, 0.5), 0 0 80px rgba(155, 35, 53, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Shimmer effect on button */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ["-200%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 4 }}
          />
          <span className="relative z-10 flex items-center justify-center gap-1.5">
            {HERO_BUTTON_TEXT}
            <ChevronDown className="inline-block ml-1 w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </span>
        </motion.button>
      </motion.div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-midnight to-transparent pointer-events-none" />
    </section>
  );
}
