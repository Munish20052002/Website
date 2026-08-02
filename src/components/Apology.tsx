"use client";

import { motion } from "framer-motion";
import { PenLine, ChevronDown } from "lucide-react";
import { APOLOGY_PARAGRAPHS, APOLOGY_SIGN_OFF } from "@/utils/constants";

export default function Apology() {
  const handleScrollToTimeline = () => {
    const timelineSection = document.getElementById("timeline");
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="apology"
      className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0f 0%, #140a0f 30%, #1a0a10 100%)",
      }}
    >
      <motion.div
        className="relative max-w-2xl w-full mx-auto"
        initial={{ opacity: 0, y: 50, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.5 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Paper card */}
        <div
          className="paper-card rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl shadow-black/40
            border border-cream-dark/20"
        >
          {/* Pen icon */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-wine/10">
            <PenLine className="w-4 h-4 sm:w-5 sm:h-5 text-wine/60" />
            <span className="font-playfair text-wine/50 text-xs sm:text-sm italic">
              a letter for you
            </span>
          </div>

          {/* Letter content */}
          <div className="space-y-4 sm:space-y-5">
            {APOLOGY_PARAGRAPHS.map((paragraph, i) => (
              <motion.p
                key={i}
                className={`font-inter leading-relaxed ${
                  i === 0
                    ? "text-wine-deep text-lg sm:text-xl md:text-2xl font-playfair italic"
                    : "text-midnight-light/85 text-sm sm:text-base md:text-lg"
                }`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + i * 0.12,
                  duration: 0.5,
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Sign off */}
          <motion.p
            className="mt-6 sm:mt-8 text-right font-playfair text-base sm:text-lg md:text-xl text-wine italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {APOLOGY_SIGN_OFF}
          </motion.p>
        </div>

        {/* Decorative shadow under card */}
        <div className="absolute -bottom-3 left-3 right-3 h-6 bg-wine/5 rounded-2xl blur-xl -z-10" />
      </motion.div>

      {/* Guiding animated indicator / arrow to next section */}
      <motion.div
        className="mt-10 sm:mt-12 text-center z-20 flex flex-col items-center cursor-pointer group"
        onClick={handleScrollToTimeline}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p className="font-inter text-rose-light/60 text-xs sm:text-sm tracking-wider mb-2 group-hover:text-rose-light transition-colors flex items-center gap-1.5">
          <span>Remember our moments?</span>
          <span className="text-crimson">✨</span>
        </p>

        <motion.button
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-wine/40 border border-crimson/30
            flex items-center justify-center text-rose-light/80 group-hover:text-cream group-hover:bg-wine/70
            group-hover:border-crimson/60 transition-all duration-300 shadow-lg shadow-wine/20"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll to memories timeline"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}
