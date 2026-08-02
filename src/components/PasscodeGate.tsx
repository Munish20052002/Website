"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Sparkles, KeyRound, AlertCircle, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { useSound } from "@/context/SoundContext";

const VALID_PASSWORDS = [
  "iloveyouullu",
  "i love you ullu",
  "iloveyou ullu",
  "i love youullu",
  "iloveuullu",
  "i love u ullu",
];

export default function PasscodeGate({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);
  const [inputVal, setInputVal] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { startAudio } = useSound();

  // Check saved authorization on mount
  useEffect(() => {
    const saved = localStorage.getItem("ullu_site_unlocked_v1");
    if (saved === "true") {
      setIsUnlocked(true);
    } else {
      setIsUnlocked(false);
    }
  }, []);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = inputVal.trim().toLowerCase().replace(/\s+/g, "");

    if (VALID_PASSWORDS.some((p) => p.replace(/\s+/g, "") === clean)) {
      setErrorMsg("");
      setIsSuccess(true);
      startAudio();
      localStorage.setItem("ullu_site_unlocked_v1", "true");

      setTimeout(() => {
        setIsUnlocked(true);
      }, 1000);
    } else {
      setErrorMsg("Access Denied: Incorrect passkey. Guess correctly to proceed.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  // Avoid flash before checking localStorage
  if (isUnlocked === null) {
    return (
      <div className="fixed inset-0 bg-midnight flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-amber-300 animate-spin" />
      </div>
    );
  }

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[300] overflow-y-auto overflow-x-hidden min-h-[100dvh] flex items-center justify-center p-4">
      {/* Background with custom mystery vault art & dark atmospheric overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-[1px] scale-105"
          style={{ backgroundImage: "url('/images/passcode-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-midnight/80 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-wine/25 via-midnight/40 to-transparent" />
      </div>

      {/* Floating magical runes / starlight particles */}
      {["✨", "🗝️", "🔮", "❓", "⭐", "🔒", "📜", "💫"].map((item, i) => (
        <motion.div
          key={i}
          className="fixed text-lg sm:text-xl pointer-events-none opacity-25"
          style={{
            left: `${((i * 27 + 12) % 85) + 6}%`,
            top: `${((i * 31 + 18) % 80) + 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, i % 2 === 0 ? 20 : -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 4.5 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          {item}
        </motion.div>
      ))}

      {/* Main Mystery Lock Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: isShaking ? [-12, 12, -8, 8, -4, 4, 0] : 0,
        }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-black/70 backdrop-blur-2xl border border-rose-gold/25 rounded-3xl p-6 sm:p-8 shadow-[0_0_70px_rgba(0,0,0,0.8)] text-center text-cream overflow-hidden"
      >
        {/* Mysterious Ambient Aura */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-wine/30 rounded-full blur-3xl pointer-events-none" />

        {/* Lock Emblem */}
        <motion.div
          className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-midnight via-wine to-crimson/80 flex items-center justify-center shadow-2xl border border-white/20 mb-5 relative"
          animate={
            isSuccess
              ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
              : { y: [0, -4, 0] }
          }
          transition={{
            duration: isSuccess ? 0.6 : 3,
            repeat: isSuccess ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          {isSuccess ? (
            <Unlock className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
          ) : (
            <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-rose-light" />
          )}
        </motion.div>

        {/* Headings */}
        <h1 className="font-playfair text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          A Secret Awaits 🗝️
        </h1>

        <p className="font-inter text-xs sm:text-sm text-cream/75 leading-relaxed mb-6">
          An encrypted vault has been sealed behind this gate. Guess the secret passkey correctly to reveal what lies within.
        </p>

        {/* Passcode Form */}
        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-rose-light/50">
              <KeyRound className="w-4 h-4" />
            </div>

            <input
              type={showPassword ? "text" : "password"}
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="Enter secret passkey..."
              autoFocus
              className="w-full pl-11 pr-11 py-3.5 sm:py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/35 font-inter text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-rose-gold/60 focus:border-transparent transition-all shadow-inner backdrop-blur-md"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-rose-light/50 hover:text-rose-light transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center justify-center gap-1.5 text-xs text-rose-light font-inter bg-crimson/20 border border-crimson/40 py-2.5 px-3 rounded-xl"
              >
                <ShieldAlert className="w-4 h-4 shrink-0 text-crimson" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unlock Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3.5 sm:py-4 rounded-2xl font-inter font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${
              isSuccess
                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-emerald-500/40"
                : "bg-gradient-to-r from-wine via-crimson to-wine text-white shadow-crimson/40 hover:shadow-crimson/70 border border-white/20"
            }`}
          >
            {isSuccess ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Access Granted! Opening... ✨</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Decrypt &amp; Enter 🗝️</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Mysterious Hint */}
        <div className="mt-6 pt-5 border-t border-white/10 text-[11px] sm:text-xs text-rose-light/50 font-inter">
          💡 Hint: A 4-word secret phrase only you would know...
        </div>
      </motion.div>
    </div>
  );
}
