"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COUPONS } from "@/utils/constants";
import type { CouponItem } from "@/utils/constants";
import { Ticket } from "lucide-react";

function CouponCard({ coupon, index }: { coupon: CouponItem; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="cursor-pointer aspect-[16/10] sm:aspect-[3/2] touch-manipulation"
      onClick={() => setIsFlipped(!isFlipped)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    >
      <div className={`flip-card ${isFlipped ? "flipped" : ""} w-full h-full`}>
        <div className="flip-card-inner">
          {/* Front */}
          <div
            className="flip-card-front flex flex-col items-center justify-center
              bg-gradient-to-br from-midnight-light to-wine-deep/80
              border border-gold/20 p-4 sm:p-5"
            style={{
              borderRadius: "1rem",
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(212, 168, 83, 0.03) 10px, rgba(212, 168, 83, 0.03) 11px)",
            }}
          >
            {/* Perforated edge look */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-7 bg-midnight rounded-r-full" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-7 bg-midnight rounded-l-full" />

            <span className="text-3xl sm:text-4xl mb-2 sm:mb-3">{coupon.emoji}</span>
            <h4 className="font-playfair text-base sm:text-lg md:text-xl text-gold-light text-center px-2">
              {coupon.title}
            </h4>
            <span className="mt-1.5 text-rose/40 text-[11px] sm:text-xs font-inter">
              tap to open
            </span>
          </div>

          {/* Back */}
          <div
            className="flip-card-back flex flex-col items-center justify-center
              bg-gradient-to-br from-crimson to-wine
              border border-crimson-light/20 p-4 sm:p-5"
            style={{ borderRadius: "1rem" }}
          >
            {/* Perforated edge look */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-7 bg-wine rounded-r-full" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-7 bg-wine rounded-l-full" />

            <Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-gold/50 mb-2 sm:mb-3" />
            <p className="font-inter text-cream text-xs sm:text-sm md:text-base text-center leading-relaxed mb-2 sm:mb-3 px-2">
              {coupon.description}
            </p>
            <span className="text-gold/60 text-[11px] sm:text-xs font-inter italic">
              redeemable anytime 💌
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CouponBook() {
  return (
    <section
      id="coupons"
      className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #3a2028 0%, #3d222b 50%, #42262f 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-5xl text-cream mb-3 sm:mb-4">
            Your Gift (kind of)
          </h2>
          <p className="font-inter text-rose/60 text-xs sm:text-sm md:text-base px-2">
            I couldn&apos;t wrap a box, so I wrapped promises instead
          </p>
        </motion.div>

        {/* Coupon grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {COUPONS.map((coupon, i) => (
            <CouponCard key={coupon.id} coupon={coupon} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
