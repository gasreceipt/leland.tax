import PaymentCard from "@/components/payment-card"
import MarqueeTicker from "@/components/marquee-ticker"
import { creator } from "@/lib/creator"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Grid background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, black 1px, transparent 1px),
              linear-gradient(to bottom, black 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Marquee header */}
      <MarqueeTicker />

      {/* Main content */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-3 md:px-4 pb-20 pt-20 md:pt-32">
        <PaymentCard />
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black text-white py-3 md:py-4 text-center border-t-2 md:border-t-4 border-black z-20">
        <p className="font-mono text-xs md:text-sm">{creator.ui.footer}</p>
      </footer>
    </div>
  )
}
