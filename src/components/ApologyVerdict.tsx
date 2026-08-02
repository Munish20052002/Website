"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, AlertCircle, RefreshCw, CheckCircle2 } from "lucide-react";

interface ShowerItem {
  id: number;
  text: string;
  emoji: string;
  x: number;
  duration: number;
  delay: number;
  size: number;
  color: string;
}

// Grand Finale Love, Huggies & Kisses Shower Overlay
function LoveShowerCanvas({ active, triggerCount }: { active: boolean; triggerCount: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [floatingBadges, setFloatingBadges] = useState<ShowerItem[]>([]);

  // Spawn floating romantic pills on trigger
  useEffect(() => {
    if (!active && triggerCount === 0) return;

    const messages = [
      { text: "Miss You So Much! 🥺", emoji: "💌" },
      { text: "Unlimited Huggies! 🫂", emoji: "🤗" },
      { text: "Million Kisses For You 💋", emoji: "😘" },
      { text: "Forever Your Baby 🦉", emoji: "❤️" },
      { text: "I Love You Ullu 💖", emoji: "✨" },
      { text: "My Whole World 🌍", emoji: "💍" },
      { text: "Can't Wait To Hug You! 🤗", emoji: "🥰" },
      { text: "Pappi & Jhappi! 💋", emoji: "💖" },
      { text: "Always & Forever ❤️", emoji: "🌹" },
      { text: "My Sweet Mottu 🦉", emoji: "💕" },
    ];

    const colors = [
      "from-crimson/90 to-rose/90",
      "from-rose-gold/90 to-crimson/90",
      "from-rose/90 to-pink-500/90",
      "from-purple-900/90 to-crimson/90",
      "from-amber-600/90 to-rose/90",
    ];

    const newBadges: ShowerItem[] = Array.from({ length: 24 }).map((_, i) => {
      const msg = messages[i % messages.length];
      return {
        id: Date.now() + i + Math.random(),
        text: msg.text,
        emoji: msg.emoji,
        x: Math.random() * 85 + 5, // 5% to 90% width
        duration: Math.random() * 3.5 + 4, // 4s to 7.5s
        delay: Math.random() * 2.5,
        size: Math.random() * 0.3 + 0.85,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    setFloatingBadges(newBadges);
  }, [active, triggerCount]);

  // High-performance canvas rain of kisses, huggies, hearts & stars
  useEffect(() => {
    if (!active && triggerCount === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const loveSymbols = ["💋", "🫂", "💖", "😘", "🤗", "💕", "✨", "🌹", "💄", "💌", "🌸"];
    const particles: Array<{
      x: number;
      y: number;
      vy: number;
      vx: number;
      symbol: string;
      size: number;
      rotation: number;
      rotationSpeed: number;
      wobbleSpeed: number;
      wobbleAmp: number;
      initialX: number;
      opacity: number;
    }> = [];

    // Create 90 cascading love symbols
    for (let i = 0; i < 90; i++) {
      const initX = Math.random() * width;
      particles.push({
        x: initX,
        initialX: initX,
        y: Math.random() * -height * 1.2, // start staggered above screen
        vy: Math.random() * 3 + 2.5, // gentle falling speed
        vx: 0,
        symbol: loveSymbols[Math.floor(Math.random() * loveSymbols.length)],
        size: Math.random() * 22 + 18, // 18px to 40px
        rotation: (Math.random() - 0.5) * 30,
        rotationSpeed: (Math.random() - 0.5) * 2,
        wobbleSpeed: Math.random() * 0.04 + 0.02,
        wobbleAmp: Math.random() * 25 + 15,
        opacity: Math.random() * 0.4 + 0.6,
      });
    }

    let frame = 0;
    const startTime = Date.now();
    const totalDuration = 10000; // 10 seconds continuous rain

    const render = () => {
      frame++;
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.vy;
        p.x = p.initialX + Math.sin(frame * p.wobbleSpeed) * p.wobbleAmp;
        p.rotation += p.rotationSpeed;

        // Reset to top if it leaves bottom
        if (p.y > height + 50) {
          if (elapsed < totalDuration - 2000) {
            p.y = -50;
            p.initialX = Math.random() * width;
          }
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.font = `${p.size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      });

      if (elapsed < totalDuration) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, triggerCount]);

  if (!active && triggerCount === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Floating text badges with smooth Framer Motion falling physics */}
      {floatingBadges.map((badge) => (
        <motion.div
          key={badge.id}
          initial={{ y: -100, x: `${badge.x}vw`, opacity: 0, scale: 0.8 }}
          animate={{
            y: "110vh",
            opacity: [0, 1, 1, 0.9, 0],
            scale: [0.8, 1, 1, 0.95],
            rotate: [-6, 6, -4, 4],
          }}
          transition={{
            duration: badge.duration,
            delay: badge.delay,
            ease: "easeInOut",
          }}
          style={{ transform: `scale(${badge.size})` }}
          className={`absolute left-0 px-4 py-2 rounded-full bg-gradient-to-r ${badge.color} text-white font-inter font-semibold text-xs sm:text-sm shadow-[0_8px_25px_rgba(0,0,0,0.5)] border border-white/30 backdrop-blur-md flex items-center gap-2 select-none whitespace-nowrap`}
        >
          <span className="text-base">{badge.emoji}</span>
          <span>{badge.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function ApologyVerdict() {
  const [verdict, setVerdict] = useState<"pending" | "accepted" | "rejected">("pending");
  const [showerCount, setShowerCount] = useState(0);

  const handleAccept = () => {
    setVerdict("accepted");
    setShowerCount((prev) => prev + 1);
  };

  const handleReject = () => {
    setVerdict("rejected");
  };

  const handleReset = () => {
    setVerdict("pending");
  };

  const handleShowerTrigger = () => {
    setShowerCount((prev) => prev + 1);
  };

  return (
    <section
      id="verdict"
      className="relative min-h-[90vh] sm:min-h-screen py-16 sm:py-24 px-4 sm:px-6 flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #120409 0%, #1a0610 50%, #0d0206 100%)",
      }}
    >
      <LoveShowerCanvas active={verdict === "accepted"} triggerCount={showerCount} />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-crimson/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-wine/25 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-rose-gold/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {/* ======================================================== */}
          {/* 1. PENDING STATE: SAD ULLU APOLOGIZING                   */}
          {/* ======================================================== */}
          {verdict === "pending" && (
            <motion.div
              key="pending"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-center relative overflow-hidden"
            >
              {/* Subtle top badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson/15 border border-crimson/30 text-rose text-xs sm:text-sm font-medium mb-5">
                <Sparkles className="w-3.5 h-3.5 text-crimson" />
                <span>One Last Question For You 🥺</span>
              </div>

              <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl text-cream font-bold mb-4 sm:mb-5 leading-tight">
                I&apos;m Really, Really Sorry...
              </h2>

              <p className="font-inter text-rose-light/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
                I know I couldn&apos;t be there in person, and I hate that I couldn&apos;t give you the perfect day right away. You mean everything to me, and I promise to spend every moment making it up to you.
              </p>

              {/* Sad Ullu Image Container with soft breathing animation */}
              <motion.div
                className="relative mx-auto w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl mb-8 group"
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/apology-sad.png"
                  alt="Sad Ullu Apologizing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent flex items-end justify-center p-4">
                  <span className="text-cream text-xs sm:text-sm font-inter tracking-wide bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                    🥺 &ldquo;Please forgive your baby?&rdquo;
                  </span>
                </div>
              </motion.div>

              <p className="font-playfair text-lg sm:text-2xl text-cream mb-6">
                Will you accept my apology? 💌
              </p>

              {/* Decision Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                {/* Accept Button */}
                <motion.button
                  onClick={handleAccept}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-crimson via-rose to-crimson bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-inter font-semibold text-base sm:text-lg shadow-[0_10px_30px_rgba(230,57,70,0.5)] border border-white/20 flex items-center justify-center gap-3 transition-all duration-300 touch-manipulation"
                >
                  <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
                  <span>Apology Accepted 💖</span>
                </motion.button>

                {/* Not Accepted Button */}
                <motion.button
                  onClick={handleReject}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-rose-light/75 hover:text-cream font-inter font-medium text-sm sm:text-base border border-white/10 transition-all duration-200 flex items-center justify-center gap-2 touch-manipulation"
                >
                  <span>Not Accepted 😤</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* 2. REJECTED STATE: CRYING ULLU                           */}
          {/* ======================================================== */}
          {verdict === "rejected" && (
            <motion.div
              key="rejected"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-3xl p-6 sm:p-10 border border-crimson/30 shadow-[0_20px_60px_rgba(230,57,70,0.2)] backdrop-blur-2xl text-center relative overflow-hidden"
            >
              {/* Crying rain badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose/15 border border-rose/30 text-rose text-xs sm:text-sm font-medium mb-5">
                <AlertCircle className="w-3.5 h-3.5 text-crimson" />
                <span>Heartbreak Level: Maximum 😭</span>
              </div>

              <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl text-cream font-bold mb-3 leading-tight">
                Hawww! 😭😭😭
              </h2>

              <p className="font-inter text-rose-light/85 text-sm sm:text-base md:text-lg max-w-lg mx-auto mb-6 leading-relaxed">
                Look what you did! The baby Ullu is crying endless waterfall tears! Please maan jao na... I promise 100 extra hugs and infinite cheese burst pizzas! 🍕🥺
              </p>

              {/* Crying Ullu Image */}
              <motion.div
                className="relative mx-auto w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-crimson/30 shadow-2xl mb-8"
                animate={{
                  rotate: [-1, 1, -1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/apology-crying.png"
                  alt="Crying Ullu"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent flex items-end justify-center p-4">
                  <span className="text-rose-light text-xs sm:text-sm font-inter bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md border border-crimson/20">
                    💔 &ldquo;Maan jao pleaseee... 🥺&rdquo;
                  </span>
                </div>
              </motion.div>

              {/* Retry / Change mind button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  onClick={handleAccept}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-crimson via-rose to-crimson text-white font-inter font-semibold text-base sm:text-lg shadow-[0_10px_30px_rgba(230,57,70,0.5)] border border-white/20 flex items-center justify-center gap-3 transition-all duration-300 touch-manipulation"
                >
                  <Heart className="w-5 h-5 fill-white text-white" />
                  <span>Okay fine, I forgive you! ❤️</span>
                </motion.button>

                <button
                  onClick={handleReset}
                  className="text-xs sm:text-sm text-rose-light/50 hover:text-rose-light flex items-center gap-1.5 transition-colors py-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Try again</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* 3. ACCEPTED STATE: HUGGING & TALL SLIM DANCING           */}
          {/* ======================================================== */}
          {verdict === "accepted" && (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-3xl p-6 sm:p-10 border border-rose-gold/30 shadow-[0_20px_80px_rgba(230,57,70,0.4)] backdrop-blur-2xl text-center relative overflow-hidden"
            >
              {/* Golden celebration badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-gold/20 via-crimson/20 to-rose-gold/20 border border-rose-gold/40 text-cream text-xs sm:text-sm font-semibold mb-5 shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Apology Accepted with Love! ✨</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-playfair text-3xl sm:text-5xl md:text-6xl text-cream font-bold mb-4 tracking-tight"
              >
                YAYYY! 🎉 Best Girlfriend Ever!
              </motion.h2>

              {/* Grand Mesmerizing Image Reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="relative mx-auto w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden border-2 border-rose-gold/40 shadow-[0_0_50px_rgba(255,183,178,0.3)] mb-8 group"
              >
                {/* Glowing radial pulse behind image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-crimson/20 via-transparent to-rose-gold/20 animate-pulse pointer-events-none" />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/apology-accepted.png"
                  alt="Two Ullus Hugging and Tall Slim Ullu Dancing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent flex items-end justify-center p-4">
                  <span className="text-cream text-xs sm:text-sm font-inter tracking-wide bg-black/60 px-5 py-2 rounded-full backdrop-blur-md border border-rose-gold/30 flex items-center gap-2 shadow-lg">
                    <Heart className="w-4 h-4 fill-crimson text-crimson animate-ping" />
                    <span>Forever &amp; Always Yours, Ullu 🦉💖</span>
                  </span>
                </div>
              </motion.div>

              {/* The Grand Finale Shower Trigger Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-3"
              >
                <motion.button
                  onClick={handleShowerTrigger}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-crimson via-rose to-rose-gold text-white font-inter font-semibold text-sm sm:text-base shadow-[0_0_35px_rgba(230,57,70,0.6)] border border-white/30 flex items-center justify-center gap-3 transition-all duration-300 touch-manipulation animate-pulse"
                >
                  <span className="text-xl">💋</span>
                  <span>With Lots of Love, your baby 🦉❤️</span>
                  <Sparkles className="w-5 h-5 text-amber-200 fill-amber-200" />
                </motion.button>

                <p className="text-xs text-rose-light/50 font-inter">
                  Tap anytime to send infinite love from the sky ✨
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
