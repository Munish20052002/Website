"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X } from "lucide-react";

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
    options: ["A lot", "Soo much", "Infinite ∞"],
    correctIndex: 2,
    emoji: "🥺",
  },
  {
    question: "How much do I love you?",
    options: ["Super duper much", "More than anybody else", "Infinite ∞"],
    correctIndex: 2,
    emoji: "❤️",
  },
];

// Floating love emojis in background
function FloatingLoveEmojis() {
  const emojis = ["❤️", "💕", "💖", "💗", "💋", "😘", "🥰", "💞", "🫶", "✨", "💝", "🤗", "💌", "💓", "💘"];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {emojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${((i * 23 + 5) % 90) + 5}%`,
            bottom: "-5%",
            opacity: 0.15 + (i % 4) * 0.05,
          }}
          animate={{
            y: [0, -window?.innerHeight ? -1200 : -1200],
            x: [0, (i % 2 === 0 ? 30 : -30), 0],
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

// Heart burst animation on correct answer
function HeartBurst() {
  const hearts = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const distance = 80 + (i % 5) * 40;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      emoji: ["❤️", "💖", "💕", "✨", "💗"][i % 5],
      size: 16 + (i % 4) * 6,
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

// Wrong answer shake + message
function WrongAnswer({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-wine-deep to-midnight-light border border-wine/30
          rounded-2xl p-8 md:p-10 max-w-sm mx-6 text-center shadow-2xl"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0, x: [0, -10, 10, -10, 10, 0] }}
        transition={{ x: { duration: 0.5, delay: 0.1 }, scale: { duration: 0.3 } }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <X className="w-12 h-12 text-crimson mx-auto mb-4" />
        </motion.div>
        <h3 className="font-playfair text-2xl text-cream mb-3">Oops!</h3>
        <p className="font-inter text-rose/70 text-sm mb-2">
          You got one wrong, Ullu 🦉
        </p>
        <p className="font-inter text-rose/50 text-xs mb-6">
          Let&apos;s start over... you know these answers!
        </p>
        <motion.button
          onClick={onReset}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-wine to-crimson
            text-cream font-inter text-sm cursor-pointer
            border border-crimson/30 hover:brightness-110 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try again 💕
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// Success screen before unlocking
function SuccessScreen({ onUnlock }: { onUnlock: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, #2a0f1a 0%, #0a0a0f 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <HeartBurst />
      <motion.div
        className="text-center relative z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
      >
        <motion.div
          className="text-6xl md:text-8xl mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          🦉💕
        </motion.div>
        <h2 className="font-playfair text-3xl md:text-5xl text-cream mb-4">
          You know me so well
        </h2>
        <p className="font-inter text-rose/60 text-sm md:text-base mb-8">
          I knew you would 💌
        </p>
        <motion.button
          onClick={onUnlock}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-crimson to-wine
            text-cream font-inter text-lg cursor-pointer
            border border-gold/20
            relative overflow-hidden"
          style={{
            boxShadow: "0 0 40px rgba(155, 35, 53, 0.4), 0 0 80px rgba(155, 35, 53, 0.15)",
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

export default function QuizGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showWrong, setShowWrong] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const handleAnswer = useCallback(
    (selectedIndex: number) => {
      const isCorrect = selectedIndex === QUESTIONS[currentQuestion].correctIndex;

      if (isCorrect) {
        setShowBurst(true);
        setTimeout(() => setShowBurst(false), 1200);

        if (currentQuestion === QUESTIONS.length - 1) {
          // All questions answered correctly!
          setTimeout(() => setShowSuccess(true), 800);
        } else {
          // Move to next question
          setTimeout(() => setCurrentQuestion((prev) => prev + 1), 800);
        }
      } else {
        // Wrong — show error and reset to question 1
        setTimeout(() => setShowWrong(true), 300);
      }
    },
    [currentQuestion]
  );

  const handleReset = () => {
    setShowWrong(false);
    setCurrentQuestion(0);
  };

  const handleUnlock = () => {
    setShowSuccess(false);
    setUnlocked(true);
  };

  if (unlocked) {
    return <>{children}</>;
  }

  const q = QUESTIONS[currentQuestion];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #1f0a14 0%, #120810 40%, #0a0a0f 100%)",
      }}
    >
      <FloatingLoveEmojis />

      {/* Progress dots */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {QUESTIONS.map((_, i) => (
          <motion.div
            key={i}
            className={`w-3 h-3 rounded-full border ${
              i < currentQuestion
                ? "bg-crimson border-crimson"
                : i === currentQuestion
                ? "bg-wine border-crimson"
                : "bg-transparent border-wine/30"
            }`}
            animate={
              i === currentQuestion
                ? { scale: [1, 1.3, 1], borderColor: ["#9b2335", "#c0354d", "#9b2335"] }
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
          className="relative z-20 max-w-md w-full mx-6"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Card background */}
          <div
            className="rounded-3xl p-8 md:p-10 border border-wine/20 backdrop-blur-sm
              relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(61,15,27,0.8) 0%, rgba(20,20,32,0.9) 100%)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(155,35,53,0.1)",
            }}
          >
            {/* Decorative corner hearts */}
            <span className="absolute top-4 left-4 text-lg opacity-20">💕</span>
            <span className="absolute top-4 right-4 text-lg opacity-20">💕</span>
            <span className="absolute bottom-4 left-4 text-lg opacity-20">✨</span>
            <span className="absolute bottom-4 right-4 text-lg opacity-20">✨</span>

            {/* Question number */}
            <motion.div
              className="flex items-center justify-center gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Heart className="w-4 h-4 text-crimson" />
              <span className="font-inter text-rose/40 text-xs tracking-widest uppercase">
                Question {currentQuestion + 1} of {QUESTIONS.length}
              </span>
              <Heart className="w-4 h-4 text-crimson" />
            </motion.div>

            {/* Emoji */}
            <motion.div
              className="text-5xl text-center mb-5"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {q.emoji}
            </motion.div>

            {/* Question text */}
            <motion.h2
              className="font-playfair text-xl md:text-2xl text-cream text-center mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {q.question}
            </motion.h2>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((option, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full py-4 px-6 rounded-xl text-left font-inter text-base
                    text-cream/90 cursor-pointer
                    border border-wine/20 hover:border-crimson/50
                    transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(92,26,42,0.3) 0%, rgba(61,15,27,0.4) 100%)",
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
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-crimson/0 via-crimson/10 to-crimson/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span className="relative z-10 flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full border border-rose/20 flex items-center justify-center text-xs text-rose/50 shrink-0 group-hover:border-crimson/50 group-hover:text-crimson transition-colors">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{option}</span>
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Bottom decorative line */}
            <motion.div
              className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-gold/20 to-transparent"
              animate={{ scaleX: [1, 1.5, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Heart burst effect on correct answer */}
      {showBurst && <HeartBurst />}

      {/* Wrong answer overlay */}
      <AnimatePresence>
        {showWrong && <WrongAnswer onReset={handleReset} />}
      </AnimatePresence>

      {/* Success screen */}
      <AnimatePresence>
        {showSuccess && <SuccessScreen onUnlock={handleUnlock} />}
      </AnimatePresence>

      {/* Bottom hint */}
      <motion.p
        className="absolute bottom-6 left-0 right-0 text-center font-inter text-rose/20 text-xs z-20"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles className="inline w-3 h-3 mr-1" />
        answer all three to unlock your surprise
        <Sparkles className="inline w-3 h-3 ml-1" />
      </motion.p>
    </div>
  );
}
