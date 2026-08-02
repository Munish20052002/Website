"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { REASONS } from "@/utils/constants";
import { Heart } from "lucide-react";

function ReasonCard({ reason, index }: { reason: string; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="flip-card aspect-[3/4] cursor-pointer touch-manipulation"
      onClick={() => setIsFlipped(!isFlipped)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
    >
      <div
        className={`flip-card ${isFlipped ? "flipped" : ""} w-full h-full`}
      >
        <div className="flip-card-inner">
          {/* Front */}
          <div
            className="flip-card-front flex flex-col items-center justify-center
              bg-gradient-to-br from-wine-deep to-midnight-light
              border border-wine/20 p-4 sm:p-6 rounded-2xl"
          >
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-crimson/50 mb-2 sm:mb-4" />
            <span className="font-playfair text-2xl sm:text-3xl md:text-4xl text-gold/70 mb-1 sm:mb-2">
              #{index + 1}
            </span>
            <span className="font-inter text-rose/50 text-xs sm:text-sm">tap to reveal</span>
          </div>

          {/* Back */}
          <div
            className="flip-card-back flex items-center justify-center
              bg-gradient-to-br from-crimson to-wine
              border border-crimson-light/20 p-4 sm:p-6 rounded-2xl"
          >
            <p className="font-inter text-cream text-xs sm:text-sm md:text-base text-center leading-relaxed font-medium">
              {reason}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ReasonsGrid() {
  return (
    <section
      id="reasons"
      className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #301820 0%, #351c24 50%, #3a2028 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-5xl text-cream mb-3 sm:mb-4">
            Reasons I Love You
          </h2>
          <p className="font-inter text-rose/60 text-xs sm:text-sm md:text-base">
            tap each card — I dare you not to smile
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {REASONS.map((reason, i) => (
            <ReasonCard key={i} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
