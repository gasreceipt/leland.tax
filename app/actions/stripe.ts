"use server"

import { stripe } from "@/lib/stripe"

export async function startCheckoutSession(amountInDollars: number) {
  const amountInCents = Math.round(amountInDollars * 100)

  // Validate amount (min $1, max $100)
  if (amountInCents < 100 || amountInCents > 10000) {
    throw new Error("Amount must be between $1 and $100")
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Crowd Tax Contribution",
            description: `Your contribution of $${amountInDollars.toFixed(2)} to crowd.tax`,
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      amount_dollars: amountInDollars.toString(),
    },
  })

  if (!session.client_secret) {
    throw new Error("Failed to create checkout session")
  }

  return session.client_secret
}
