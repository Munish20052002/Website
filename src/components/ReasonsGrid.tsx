"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { REASONS } from "@/utils/constants";
import { Heart } from "lucide-react";

function ReasonCard({ reason, index }: { reason: string; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="flip-card aspect-[3/4] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        className={`flip-card ${isFlipped ? "flipped" : ""} w-full h-full`}
      >
        <div className="flip-card-inner">
          {/* Front */}
          <div
            className="flip-card-front flex flex-col items-center justify-center
              bg-gradient-to-br from-wine-deep to-midnight-light
              border border-wine/20 p-6"
          >
            <Heart className="w-8 h-8 text-crimson/40 mb-4" />
            <span className="font-playfair text-3xl md:text-4xl text-gold/60 mb-2">
              #{index + 1}
            </span>
            <span className="font-inter text-rose/40 text-sm">tap to reveal</span>
          </div>

          {/* Back */}
          <div
            className="flip-card-back flex items-center justify-center
              bg-gradient-to-br from-crimson to-wine
              border border-crimson-light/20 p-6"
          >
            <p className="font-inter text-cream text-sm md:text-base text-center leading-relaxed">
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
      className="relative py-20 md:py-32 px-6"
      style={{
        background:
          "linear-gradient(180deg, #301820 0%, #351c24 50%, #3a2028 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-3xl md:text-5xl text-cream mb-4">
            Reasons I Love You
          </h2>
          <p className="font-inter text-rose/50 text-sm md:text-base">
            tap each card — I dare you not to smile
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {REASONS.map((reason, i) => (
            <ReasonCard key={i} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
