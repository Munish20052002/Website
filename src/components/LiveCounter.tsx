"use client";

import { motion } from "framer-motion";
import { useLiveCounter } from "@/hooks/useLiveCounter";
import { START_DATE, HER_NICKNAME } from "@/utils/constants";
import { Clock } from "lucide-react";

function CounterDigit({ value, label }: { value: number; label: string }) {
  const displayValue = String(value).padStart(label === "days" ? 3 : 2, "0");

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative bg-midnight-light/80 backdrop-blur-sm border border-wine/20
          rounded-xl px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[100px]"
      >
        <motion.span
          key={value}
          className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold
            bg-gradient-to-b from-gold-light via-gold to-crimson bg-clip-text text-transparent
            block text-center"
          initial={{ opacity: 0.5, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {displayValue}
        </motion.span>

        {/* Subtle glow behind digits */}
        <div className="absolute inset-0 rounded-xl bg-crimson/5 blur-md -z-10" />
      </div>
      <span className="mt-2 text-rose/50 text-xs md:text-sm font-inter uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function LiveCounter() {
  const { days, hours, minutes, seconds } = useLiveCounter(START_DATE);

  return (
    <section
      id="counter"
      className="relative py-20 md:py-32 px-6"
      style={{
        background:
          "linear-gradient(180deg, #241218 0%, #2a141c 50%, #301820 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Clock className="w-6 h-6 text-gold/50 mx-auto mb-4" />
          <p className="font-inter text-rose-light/60 text-sm md:text-base mb-2">
            since the day I first saw you
          </p>
          <h2 className="font-playfair text-2xl md:text-4xl text-cream mb-12">
            Every second counts
          </h2>
        </motion.div>

        {/* Counter digits */}
        <motion.div
          className="flex justify-center gap-3 md:gap-6 flex-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CounterDigit value={days} label="days" />
          <span className="self-center text-wine text-2xl md:text-4xl font-playfair mt-[-20px]">
            :
          </span>
          <CounterDigit value={hours} label="hours" />
          <span className="self-center text-wine text-2xl md:text-4xl font-playfair mt-[-20px]">
            :
          </span>
          <CounterDigit value={minutes} label="mins" />
          <span className="self-center text-wine text-2xl md:text-4xl font-playfair mt-[-20px]">
            :
          </span>
          <CounterDigit value={seconds} label="secs" />
        </motion.div>

        {/* Caption */}
        <motion.p
          className="mt-10 font-inter text-rose/60 text-sm md:text-base italic max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          ...and I&apos;d choose you again in every single one of these seconds,{" "}
          {HER_NICKNAME}.
        </motion.p>
      </div>
    </section>
  );
}
