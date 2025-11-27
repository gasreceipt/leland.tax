"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startCheckoutSession } from "@/app/actions/stripe"
import { ArrowLeftIcon } from "lucide-react"
import { creator } from "@/lib/creator"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  amount: number
  onBack: () => void
}

export default function PaymentForm({ amount, onBack }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(true)

  const fetchClientSecret = useCallback(async () => {
    try {
      const clientSecret = await startCheckoutSession(amount)
      setIsLoading(false)
      return clientSecret
    } catch (error) {
      console.error("[v0] Error starting checkout:", error)
      setIsLoading(false)
      throw error
    }
  }, [amount])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-3xl">
      <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
        {/* Header */}
        <div className="bg-black text-white p-6 border-b-8 border-black">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="hover:bg-white hover:text-black border-2 border-white p-2 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-mono text-2xl font-bold uppercase tracking-tight">{creator.ui.paymentModalTitle}</h1>
              <p className="font-mono text-sm mt-1 opacity-80">{creator.ui.paymentModalSubtitle(amount)}</p>
            </div>
          </div>
        </div>

        {/* Stripe Checkout */}
        <div className="p-8">
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-black border-t-transparent animate-spin" />
              <p className="font-mono text-sm mt-4 text-black/60">{creator.ui.loading}</p>
            </div>
          )}
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{
              fetchClientSecret,
            }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </motion.div>
  )
}
