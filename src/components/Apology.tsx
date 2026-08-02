"use client";

import { motion } from "framer-motion";
import { PenLine } from "lucide-react";
import { APOLOGY_PARAGRAPHS, APOLOGY_SIGN_OFF } from "@/utils/constants";

export default function Apology() {
  return (
    <section
      id="apology"
      className="relative py-20 md:py-32 px-6 flex items-center justify-center"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0f 0%, #140a0f 30%, #1a0a10 100%)",
      }}
    >
      <motion.div
        className="relative max-w-2xl w-full"
        initial={{ opacity: 0, y: 60, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, rotate: -1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Paper card */}
        <div
          className="paper-card rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/40
            border border-cream-dark/20"
        >
          {/* Pen icon */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-wine/10">
            <PenLine className="w-5 h-5 text-wine/50" />
            <span className="font-playfair text-wine/40 text-sm italic">
              a letter for you
            </span>
          </div>

          {/* Letter content */}
          <div className="space-y-5">
            {APOLOGY_PARAGRAPHS.map((paragraph, i) => (
              <motion.p
                key={i}
                className={`font-inter leading-relaxed ${
                  i === 0
                    ? "text-wine-deep text-xl md:text-2xl font-playfair italic"
                    : "text-midnight-light/80 text-base md:text-lg"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + i * 0.15,
                  duration: 0.6,
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Sign off */}
          <motion.p
            className="mt-8 text-right font-playfair text-lg md:text-xl text-wine italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {APOLOGY_SIGN_OFF}
          </motion.p>
        </div>

        {/* Decorative shadow under card */}
        <div className="absolute -bottom-4 left-4 right-4 h-8 bg-wine/5 rounded-2xl blur-xl -z-10" />
      </motion.div>
    </section>
  );
}
