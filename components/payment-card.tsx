"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import CustomSlider from "./custom-slider"
import PaymentForm from "./payment-form"
import { creator } from "@/lib/creator"

export default function PaymentCard() {
  const [amount, setAmount] = useState(creator.payment.defaultAmount)
  const [showPayment, setShowPayment] = useState(false)
  const [displayAmount, setDisplayAmount] = useState(creator.payment.defaultAmount)

  useEffect(() => {
    setDisplayAmount(amount)
  }, [amount])

  const handlePresetClick = (preset: number) => {
    setAmount(preset)
  }

  const handleContinue = () => {
    setShowPayment(true)
  }

  if (showPayment) {
    return <PaymentForm amount={amount} onBack={() => setShowPayment(false)} />
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl">
      <div className="bg-white border-4 md:border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
        {/* Header */}
        <div className="bg-black text-white p-4 md:p-6 border-b-4 md:border-b-8 border-black">
          <h1 className="font-mono text-xl md:text-3xl font-bold uppercase tracking-tight">{creator.ui.cardTitle}</h1>
          <p className="font-mono text-xs md:text-sm mt-1 md:mt-2 opacity-80">{creator.ui.cardSubtitle}</p>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
          {/* Amount display */}
          <div className="text-center">
            <div className="font-mono text-xs md:text-sm uppercase tracking-wider mb-2 text-black/60">
              {creator.ui.contributionLabel}
            </div>
            <div className="font-mono text-5xl md:text-7xl font-bold text-black tabular-nums">${displayAmount}</div>
          </div>

          {/* Slider */}
          <div className="space-y-4">
            <CustomSlider
              value={amount}
              onChange={setAmount}
              min={creator.payment.minAmount}
              max={creator.payment.maxAmount}
            />
            <div className="flex justify-between font-mono text-xs text-black/40 px-1">
              <span>${creator.payment.minAmount}</span>
              <span>${creator.payment.maxAmount}</span>
            </div>
          </div>

          {/* Preset buttons */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-black/60">{creator.ui.quickSelectLabel}</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
              {creator.payment.presets.map((preset) => (
                <motion.button
                  key={preset}
                  onClick={() => handlePresetClick(preset)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    font-mono font-bold py-3 px-4 border-3 md:border-4 border-black
                    transition-colors duration-200
                    ${amount === preset ? "bg-black text-white" : "bg-white text-black hover:bg-black/10"}
                  `}
                >
                  ${preset}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Continue button */}
          <motion.button
            onClick={handleContinue}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="
              w-full font-mono font-bold text-base md:text-lg py-3 md:py-4 uppercase tracking-wider
              bg-black text-white border-3 md:border-4 border-black
              hover:bg-white hover:text-black
              transition-all duration-200
            "
          >
            {creator.ui.submitButton}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
