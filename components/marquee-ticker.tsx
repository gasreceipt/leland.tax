"use client"

import { motion } from "framer-motion"
import { creator } from "@/lib/creator"

export default function MarqueeTicker() {
  const text = creator.marquee
  const repeatedText = text.repeat(20)

  return (
    <div className="fixed top-0 left-0 right-0 bg-black text-white overflow-hidden border-b-2 md:border-b-4 border-black z-30">
      <motion.div
        className="flex whitespace-nowrap py-2 md:py-3"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        <span className="font-mono text-sm md:text-lg font-bold">{repeatedText}</span>
      </motion.div>
    </div>
  )
}
