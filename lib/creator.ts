export const creator = {
    name: "Leland",
    description: "pay your fair share",
    marquee: "PAY LELAND YOUR TAXES • SUPPORT THE CROWD • FUND LELAND • ",
    payment: {
        presets: [1, 5, 10, 25],
        defaultAmount: 5,
        minAmount: 1,
        maxAmount: 100,
    },
    ui: {
        cardTitle: "LELAND Tax Portal",
        cardSubtitle: "Select your contribution amount",
        contributionLabel: "Your Contribution",
        quickSelectLabel: "Quick Select",
        submitButton: "Continue to Payment",
        paymentModalTitle: "Complete Payment",
        paymentModalSubtitle: (amount: number) => `Contributing $${amount} to Leland`,
        loading: "Loading payment form...",
        footer: "Leland.crowd.tax © 2025 — pay Leland your taxes",
    },
}
