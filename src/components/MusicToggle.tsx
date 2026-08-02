"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export default function MusicToggle() {
  const { isPlaying, isMuted, trackTitle, toggleMute, togglePlay } =
    useSound();
  const [showTooltip, setShowTooltip] = useState(false);

  const active = isPlaying && !isMuted;

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[300] flex items-center gap-2">
      {/* Song Info Pill */}
      <AnimatePresence>
        {(showTooltip || active) && (
          <motion.div
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full
              bg-wine-deep/90 backdrop-blur-md border border-crimson/30
              text-rose-light/90 text-xs font-inter shadow-lg shadow-black/30"
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated Equalizer bars */}
            <div className="flex items-end gap-[2px] h-3.5 w-4 shrink-0">
              {[0.4, 0.8, 0.6, 1].map((height, i) => (
                <motion.span
                  key={i}
                  className="w-[2.5px] bg-gold rounded-full"
                  animate={
                    active
                      ? {
                          height: ["20%", "100%", "40%", "80%", "20%"],
                        }
                      : { height: "20%" }
                  }
                  transition={{
                    duration: 0.8 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <span className="font-medium truncate max-w-[170px]">
              {trackTitle}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={toggleMute}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full
          bg-gradient-to-br from-wine to-crimson
          backdrop-blur-md border border-gold/30
          flex items-center justify-center
          text-cream shadow-xl shadow-wine/30 cursor-pointer
          hover:brightness-110 active:scale-95 transition-all duration-300
          touch-manipulation relative overflow-hidden group"
        aria-label={active ? "Mute music" : "Play music"}
        title={trackTitle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {/* Shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {active ? (
          <Volume2 className="w-5 h-5 text-gold-light" />
        ) : (
          <VolumeX className="w-5 h-5 text-rose-light/60" />
        )}

        {/* Pulsing indicator ring when playing */}
        {active && (
          <motion.span
            className="absolute inset-0 rounded-full border border-gold/40 pointer-events-none"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </div>
  );
}
