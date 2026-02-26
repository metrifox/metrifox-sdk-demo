// Default theme for Pricing cards (nested shape matching SDK PricingTableTheme).
// Used when theme is edited via the nested Theme Config Panel.
export const defaultPricingTableTheme: Record<string, unknown> = {
  card: {
    background: "#ffffff",
    borderColor: "#e5e7eb",
    header: {
      background: "#f9fafb",
      textColor: "#111827",
    },
    description: {
      textColor: "#6b7280",
    },
    price: {
      amountColor: "#111827",
      primaryTextColor: "#374151",
      secondaryTextColor: "#9ca3af",
      background: "#ffffff",
    },
  },
  button: {
    background: "#2563eb",
    textColor: "#ffffff",
    secondaryBackground: "#f3f4f6",
    secondaryTextColor: "#374151",
  },
  featureList: {
    textColor: "#374151",
    iconColor: "#2563eb",
  },
  tabs: {
    activeText: "#2563eb",
    inactiveText: "#6b7280",
    indicator: "#2563eb",
    borderColor: "#e5e7eb",
  },
  intervalToggle: {
    background: "#e5e7eb",
    activeBackground: "#111827",
    activeText: "#ffffff",
    inactiveText: "#6b7280",
  },
  display: {
    plansOnly: false,
    singlePurchasesOnly: false,
    showTabHeader: true,
  },
}
