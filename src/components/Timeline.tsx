"use client";

import { motion } from "framer-motion";
import { MEMORIES } from "@/utils/constants";
import type { MemoryItem } from "@/utils/constants";
import { Camera } from "lucide-react";

function MemoryCard({
  memory,
  index,
}: {
  memory: MemoryItem;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`flex items-center gap-4 md:gap-8 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col md:flex-row`}
      initial={{ opacity: 0, y: 50, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1,
      }}
    >
      {/* Image container */}
      <motion.div
        className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden
          bg-gradient-to-br from-wine/20 to-midnight-light
          border border-wine/10 flex items-center justify-center
          relative group cursor-pointer"
        whileHover={{ rotateY: 3, rotateX: -2, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ perspective: 800 }}
      >
        {memory.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full h-full object-cover"
          />
        ) : (
          /* Placeholder — swap with real photos! */
          <div className="flex flex-col items-center gap-3 text-rose/30">
            <Camera className="w-10 h-10" />
            <span className="text-sm font-inter">📷 add your photo</span>
          </div>
        )}

        {/* Hover overlay with emoji */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            flex items-end justify-center pb-4"
        >
          <span className="text-3xl">{memory.emoji}</span>
        </div>
      </motion.div>

      {/* Text content */}
      <div className={`w-full md:w-1/2 ${isEven ? "md:text-left" : "md:text-right"} text-center`}>
        <span className="text-3xl mb-2 block">{memory.emoji}</span>
        <h3 className="font-playfair text-xl md:text-2xl text-cream mb-3">
          {memory.title}
        </h3>
        <p className="font-inter text-rose-light/70 text-sm md:text-base leading-relaxed">
          {memory.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative py-20 md:py-32 px-6"
      style={{
        background:
          "linear-gradient(180deg, #1a0a10 0%, #1f0e14 50%, #241218 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-3xl md:text-5xl text-cream mb-4">
            Our Little Moments
          </h2>
          <p className="font-inter text-rose/50 text-sm md:text-base">
            the ones that play on repeat in my head
          </p>
        </motion.div>

        {/* Timeline line (desktop only) */}
        <div className="hidden md:block absolute left-1/2 top-44 bottom-32 w-px bg-gradient-to-b from-transparent via-wine/30 to-transparent" />

        {/* Memory cards */}
        <div className="space-y-16 md:space-y-24 relative">
          {MEMORIES.map((memory, i) => (
            <MemoryCard key={memory.id} memory={memory} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
