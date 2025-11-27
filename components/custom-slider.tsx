"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface CustomSliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
}

export default function CustomSlider({ value, onChange, min, max }: CustomSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })

  // Update x position when value changes externally
  useEffect(() => {
    if (trackRef.current && !isDragging) {
      const trackWidth = trackRef.current.offsetWidth
      const thumbSize = window.innerWidth < 768 ? 32 : 24
      const availableWidth = trackWidth - thumbSize
      const position = ((value - min) / (max - min)) * availableWidth
      x.set(position)
    }
  }, [value, min, max, isDragging, x])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return
    setIsDragging(true)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    updatePosition(e.clientX)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false)
    ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
  }

  const handleTrackClick = (e: React.MouseEvent) => {
    updatePosition(e.clientX)
  }

  const updatePosition = (clientX: number) => {
    if (!trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const thumbSize = window.innerWidth < 768 ? 32 : 24
    const availableWidth = rect.width - thumbSize

    let position = clientX - rect.left - thumbSize / 2
    position = Math.max(0, Math.min(position, availableWidth))

    x.set(position)

    const percentage = position / availableWidth
    const newValue = Math.round(min + percentage * (max - min))
    onChange(newValue)
  }

  return (
    <div className="relative py-6 md:py-4">
      <div ref={trackRef} onClick={handleTrackClick} className="relative h-3 md:h-2 bg-black cursor-pointer">
        {/* Thumb - responsive sizing via inline style */}
        <motion.div
          style={{ x: springX }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 md:w-6 md:h-6 bg-black border-4 border-black cursor-grab active:cursor-grabbing touch-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>
    </div>
  )
}
