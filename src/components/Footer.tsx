"use client";

import { motion } from "framer-motion";
import { FOOTER_TEXT } from "@/utils/constants";
import { Heart } from "lucide-react";

export default function Footer() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <footer
      className="py-8 px-6 text-center"
      style={{
        background:
          "linear-gradient(180deg, #4a2030 0%, #0a0a0f 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-2"
      >
        <Heart className="w-4 h-4 text-crimson/40" />
        <p className="font-inter text-rose/30 text-xs md:text-sm">
          {FOOTER_TEXT}
        </p>
        <p className="font-inter text-rose/20 text-xs">
          {dateStr}
        </p>
      </motion.div>
    </footer>
  );
}
