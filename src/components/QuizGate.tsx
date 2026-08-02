"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X, ChevronRight } from "lucide-react";
import { useSound } from "@/context/SoundContext";
import MusicToggle from "@/components/MusicToggle";

// ============================================================
// INTRO SPLASH SCREEN — The very first thing she sees
// ============================================================

function IntroSplash({ onStart }: { onStart: () => void }) {
  const { startAudio } = useSound();

  const handleStart = () => {
    startAudio();
    onStart();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-y-auto overflow-x-hidden min-h-[100dvh] flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background image — romantic mountain trek */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/romantic-bg.png')" }}
        />
        {/* Dark overlay for text readability + romantic mood */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />
        {/* Wine/crimson mood tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/60 via-transparent to-crimson/15" />
      </div>

      {/* Floating emojis */}
      {["❤️", "💕", "✨", "💋", "🥰", "💖", "🫶", "😘", "💗", "💞", "🦉", "💝"].map(
        (emoji, i) => (
          <motion.div
            key={i}
            className="fixed text-lg sm:text-2xl pointer-events-none"
            style={{
              left: `${((i * 23 + 7) % 88) + 6}%`,
              bottom: "-5%",
              opacity: 0.15 + (i % 3) * 0.05,
            }}
            animate={{
              y: [0, -1400],
              x: [0, i % 2 === 0 ? 30 : -30, 0],
              rotate: [0, i % 2 === 0 ? 180 : -180],
            }}
            transition={{
              duration: 14 + (i % 5) * 3,
              delay: (i * 1.2) % 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {emoji}
          </motion.div>
        )
      )}

      {/* Music control always available */}
      <MusicToggle />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[100dvh] px-5 sm:px-6 py-12 text-center w-full max-w-lg mx-auto">
        {/* Top sparkle decoration */}
        <motion.div
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-gold/60" />
          </motion.div>
        </motion.div>

        {/* Small tagline */}
        <motion.p
          className="font-inter text-rose-light/70 text-[11px] sm:text-sm tracking-[0.35em] sm:tracking-[0.5em] uppercase mb-3 sm:mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          ── something special awaits ──
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-1 sm:mb-2"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            style={{
              background:
                "linear-gradient(180deg, #faf3ee 0%, #e8c97a 40%, #d4a853 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Hey,
          </span>
        </motion.h1>

        <motion.h1
          className="font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            style={{
              background:
                "linear-gradient(180deg, #faf3ee 0%, #e8a8b4 50%, #d47c8a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ullu
          </span>
          <motion.span
            className="inline-block text-3xl sm:text-4xl md:text-5xl ml-2 sm:ml-3 align-middle"
            initial={{ opacity: 0, scale: 0, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
          >
            🦉
          </motion.span>
        </motion.h1>

        {/* Decorative divider */}
        <motion.div
          className="w-20 md:w-32 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-5 sm:mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        />

        {/* Subtext */}
        <motion.p
          className="font-inter text-cream/80 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md leading-relaxed mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          I made something special for you.
        </motion.p>
        <motion.p
          className="font-inter text-rose/70 text-xs sm:text-sm md:text-base max-w-xs sm:max-w-md leading-relaxed mb-1.5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          But first...
        </motion.p>
        <motion.p
          className="font-inter text-rose-light/80 text-xs sm:text-sm md:text-base italic max-w-xs sm:max-w-md mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
        >
          let&apos;s see if you really know us 💕
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={handleStart}
          className="relative px-8 py-3.5 sm:px-10 sm:py-4 rounded-full cursor-pointer
            bg-gradient-to-r from-wine via-crimson to-wine
            text-cream font-inter text-base sm:text-lg font-medium
            border border-crimson/30
            group overflow-hidden touch-manipulation"
          style={{
            boxShadow:
              "0 0 35px rgba(155,35,53,0.45), 0 0 70px rgba(155,35,53,0.18), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 3.3, duration: 0.8, type: "spring" }}
          whileHover={{
            scale: 1.06,
            boxShadow:
              "0 0 50px rgba(155,35,53,0.6), 0 0 90px rgba(155,35,53,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
          whileTap={{ scale: 0.96 }}
        >
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-200%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 3.5 }}
          />
          <span className="relative z-10 flex items-center gap-2">
            Are you ready?
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.span>
          </span>
        </motion.button>

        {/* Pulsing heart */}
        <motion.div
          className="mt-6 sm:mt-8 text-xl sm:text-2xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          initial={{ opacity: 0 }}
        >
          💓
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="fixed bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-midnight to-transparent pointer-events-none z-10" />
    </motion.div>
  );
}

// ============================================================
// QUIZ QUESTIONS
// ============================================================

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  emoji: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: "Tell me... the date when I first saw you?",
    options: ["8th July, 2025", "9th July, 2025", "11th July, 2025"],
    correctIndex: 0,
    emoji: "📅",
  },
  {
    question: "How much do I miss you?",
    options: ["A lot", "Soo much", "Infinite ∞", "All of the above 💕"],
    correctIndex: 3,
    emoji: "🥺",
  },
  {
    question: "How much do I love you?",
    options: ["Super duper much", "More than anybody else", "Infinite ∞", "All of the above ❤️"],
    correctIndex: 3,
    emoji: "❤️",
  },
];

// ============================================================
// SUPPORTING COMPONENTS
// ============================================================

function FloatingLoveEmojis() {
  const emojis = [
    "❤️", "💕", "💖", "💗", "💋", "😘", "🥰", "💞",
    "🫶", "✨", "💝", "🤗", "💌", "💓", "💘",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {emojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-xl sm:text-2xl"
          style={{
            left: `${((i * 23 + 5) % 88) + 6}%`,
            bottom: "-5%",
            opacity: 0.15 + (i % 4) * 0.05,
          }}
          animate={{
            y: [0, -1400],
            x: [0, i % 2 === 0 ? 25 : -25, 0],
            rotate: [0, i % 2 === 0 ? 180 : -180],
          }}
          transition={{
            duration: 12 + (i % 6) * 3,
            delay: (i * 1.5) % 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}

function HeartBurst() {
  const hearts = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const distance = 70 + (i % 5) * 35;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      emoji: ["❤️", "💖", "💕", "✨", "💗"][i % 5],
      size: 14 + (i % 4) * 6,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
      {hearts.map((h, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ fontSize: h.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{ x: h.x, y: h.y, opacity: 0, scale: 1.5 }}
          transition={{ duration: 1, ease: "easeOut", delay: i * 0.02 }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  );
}

function WrongAnswer({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-wine-deep to-midnight-light border border-wine/30
          rounded-2xl p-6 sm:p-8 md:p-10 max-w-xs sm:max-w-sm w-full mx-auto text-center shadow-2xl"
        initial={{ scale: 0.85, y: 20 }}
        animate={{ scale: 1, y: 0, x: [0, -8, 8, -8, 8, 0] }}
        transition={{
          x: { duration: 0.5, delay: 0.1 },
          scale: { duration: 0.3 },
        }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <X className="w-10 h-10 sm:w-12 sm:h-12 text-crimson mx-auto mb-3 sm:mb-4" />
        </motion.div>
        <h3 className="font-playfair text-xl sm:text-2xl text-cream mb-2 sm:mb-3">Oops!</h3>
        <p className="font-inter text-rose/80 text-xs sm:text-sm mb-1.5">
          You got one wrong, Ullu 🦉
        </p>
        <p className="font-inter text-rose/60 text-[11px] sm:text-xs mb-5 sm:mb-6">
          Let&apos;s start over... you know these answers!
        </p>
        <motion.button
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-wine to-crimson
            text-cream font-inter text-sm cursor-pointer
            border border-crimson/30 hover:brightness-110 transition-all touch-manipulation"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try again 💕
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function SuccessScreen({ onUnlock }: { onUnlock: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #2a0f1a 0%, #0a0a0f 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <HeartBurst />
      <motion.div
        className="text-center relative z-10 max-w-sm mx-auto"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
      >
        <motion.div
          className="text-5xl sm:text-7xl md:text-8xl mb-4 sm:mb-6"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          🦉💕
        </motion.div>
        <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl text-cream mb-3 sm:mb-4 px-2">
          You know me so well
        </h2>
        <p className="font-inter text-rose/70 text-xs sm:text-sm md:text-base mb-6 sm:mb-8">
          I knew you would 💌
        </p>
        <motion.button
          onClick={onUnlock}
          className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-crimson to-wine
            text-cream font-inter text-base sm:text-lg cursor-pointer
            border border-gold/20 relative overflow-hidden touch-manipulation"
          style={{
            boxShadow:
              "0 0 35px rgba(155,35,53,0.45), 0 0 70px rgba(155,35,53,0.18)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ["-200%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10">Open your surprise ✨</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// QUIZ SCREEN
// ============================================================

function QuizScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showWrong, setShowWrong] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const handleAnswer = useCallback(
    (selectedIndex: number) => {
      const isCorrect =
        selectedIndex === QUESTIONS[currentQuestion].correctIndex;

      if (isCorrect) {
        setShowBurst(true);
        setTimeout(() => setShowBurst(false), 1200);

        if (currentQuestion === QUESTIONS.length - 1) {
          setTimeout(() => setShowSuccess(true), 800);
        } else {
          setTimeout(() => setCurrentQuestion((prev) => prev + 1), 800);
        }
      } else {
        setTimeout(() => setShowWrong(true), 300);
      }
    },
    [currentQuestion]
  );

  const handleReset = () => {
    setShowWrong(false);
    setCurrentQuestion(0);
  };

  const q = QUESTIONS[currentQuestion];

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto overflow-x-hidden min-h-[100dvh] px-4 py-8"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #1f0a14 0%, #120810 40%, #0a0a0f 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FloatingLoveEmojis />
      <MusicToggle />

      {/* Progress dots */}
      <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 flex gap-2.5 sm:gap-3 z-30">
        {QUESTIONS.map((_, i) => (
          <motion.div
            key={i}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border ${
              i < currentQuestion
                ? "bg-crimson border-crimson"
                : i === currentQuestion
                ? "bg-wine border-crimson"
                : "bg-transparent border-wine/30"
            }`}
            animate={
              i === currentQuestion
                ? {
                    scale: [1, 1.25, 1],
                    borderColor: ["#9b2335", "#c0354d", "#9b2335"],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          className="relative z-20 max-w-md w-full my-auto"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-wine/20 backdrop-blur-sm
              relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(61,15,27,0.85) 0%, rgba(20,20,32,0.92) 100%)",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(155,35,53,0.15)",
            }}
          >
            {/* Corner decorations */}
            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 text-base sm:text-lg opacity-20">
              💕
            </span>
            <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-base sm:text-lg opacity-20">
              💕
            </span>
            <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-base sm:text-lg opacity-20">
              ✨
            </span>
            <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-base sm:text-lg opacity-20">
              ✨
            </span>

            {/* Question number */}
            <motion.div
              className="flex items-center justify-center gap-2 mb-4 sm:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Heart className="w-3.5 h-3.5 text-crimson" />
              <span className="font-inter text-rose/50 text-[11px] sm:text-xs tracking-widest uppercase">
                Question {currentQuestion + 1} of {QUESTIONS.length}
              </span>
              <Heart className="w-3.5 h-3.5 text-crimson" />
            </motion.div>

            {/* Emoji */}
            <motion.div
              className="text-4xl sm:text-5xl text-center mb-3 sm:mb-5"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {q.emoji}
            </motion.div>

            {/* Question text */}
            <motion.h2
              className="font-playfair text-lg sm:text-xl md:text-2xl text-cream text-center mb-6 sm:mb-8 leading-snug sm:leading-relaxed px-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {q.question}
            </motion.h2>

            {/* Options */}
            <div className="space-y-2.5 sm:space-y-3">
              {q.options.map((option, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full py-3.5 px-4 sm:py-4 sm:px-6 rounded-xl text-left font-inter text-sm sm:text-base
                    text-cream/95 cursor-pointer
                    border border-wine/25 hover:border-crimson/50
                    transition-all duration-300 relative overflow-hidden group touch-manipulation"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(92,26,42,0.35) 0%, rgba(61,15,27,0.45) 100%)",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(155,35,53,0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-crimson/0 via-crimson/10 to-crimson/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-rose/25 flex items-center justify-center text-xs text-rose/60 shrink-0 group-hover:border-crimson/50 group-hover:text-crimson transition-colors">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="font-medium">{option}</span>
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Bottom line */}
            <motion.div
              className="mt-5 sm:mt-6 mx-auto h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-gold/20 to-transparent"
              animate={{ scaleX: [1, 1.4, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {showBurst && <HeartBurst />}

      <AnimatePresence>
        {showWrong && <WrongAnswer onReset={handleReset} />}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && <SuccessScreen onUnlock={onComplete} />}
      </AnimatePresence>

      {/* Bottom hint */}
      <motion.p
        className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center font-inter text-rose/30 text-[11px] sm:text-xs z-20 px-4"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles className="inline w-3 h-3 mr-1" />
        answer all three to unlock your surprise
        <Sparkles className="inline w-3 h-3 ml-1" />
      </motion.p>
    </motion.div>
  );
}

// ============================================================
// MAIN QUIZ GATE — Controls the flow: Intro → Quiz → Unlock
// ============================================================

type GatePhase = "intro" | "quiz" | "unlocked";

export default function QuizGate({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<GatePhase>("intro");
  const { setTrack } = useSound();

  // Set intro music on initial load
  useEffect(() => {
    if (phase === "intro") {
      setTrack("intro");
    }
  }, [phase, setTrack]);

  const handleStartQuiz = () => {
    setTrack("quiz");
    setPhase("quiz");
  };

  const handleUnlock = () => {
    setTrack("letter");
    setPhase("unlocked");
  };

  if (phase === "unlocked") {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      {phase === "intro" && (
        <IntroSplash key="intro" onStart={handleStartQuiz} />
      )}
      {phase === "quiz" && (
        <QuizScreen key="quiz" onComplete={handleUnlock} />
      )}
    </AnimatePresence>
  );
}
