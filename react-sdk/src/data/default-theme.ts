// Default configuration for customer portal (matches CustomerPortalTheme in SDK).
export const defaultCustomerPortalTheme = {
  general: {
    linkColor: "#006FEE",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    fontFamily: '"Geist", "Inter", "Helvetica", "Arial", sans-serif',
    containerPadding: "24px",
  },
  tabs: {
    tabBackground: "#ffffff",
    tabBorderColor: "#E4E4E7",
    activeTabBackground: "#006FEE",
    activeTabTextColor: "#ffffff",
    inactiveTabTextColor: "#6b7280",
  },
  sections: {
    background: "#ffffff",
    padding: "0px",
    borderColor: "transparent",
    borderRadius: "8px",
    emptyTextColor: "#9ca3af",
    usage: {
      barColor: "#006FEE",
      trackColor: "#e5e7eb",
    },
    content: {
      background: "#F4F4F5",
      padding: "24px",
      borderColor: "#E4E4E7",
      borderRadius: "8px",
    },
    summaryBalance: {
      background: "#ffffff",
      padding: "24px",
      borderColor: "#E4E4E7",
      borderRadius: "8px",
      label: {
        fontSize: "13px",
        fontWeight: "500",
        color: "#71717A",
      },
      value: {
        fontSize: "20px",
        fontWeight: "700",
        color: "#52525B",
      },
      unit: {
        fontSize: "13px",
        fontWeight: "500",
        color: "#52525B",
      },
    },
    header: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#52525B",
    },
    label: {
      fontSize: "13px",
      fontWeight: "500",
      color: "#71717A",
    },
    value: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#52525B",
    },
  },
  buttons: {
    primary: {
      backgroundColor: "#111827",
      border: {
        color: "#52525B",
        width: "1px",
        radius: "8px",
      },
      typography: {
        fontSize: "14px",
        fontWeight: "500",
        color: "#ffffff",
      },
    },
    secondary: {
      backgroundColor: "#E4E4E7",
      border: {
        color: "#E4E4E7",
        width: "1px",
        radius: "8px",
      },
      typography: {
        fontSize: "13px",
        fontWeight: "500",
        color: "#3F3F46",
      },
    },
  },
  lineItems: {
    parentRow: {
      background: "#ffffff",
      borderColor: "#e5e7eb",
      typography: {
        label: { color: "#111827" },
        quantity: { color: "#6b7280" },
      },
    },
    childRow: {
      background: "#ffffff",
      borderColor: "#e5e7eb",
      typography: {
        label: { color: "#111827" },
        quantity: { color: "#6b7280" },
      },
    },
  },
  tables: {
    headerBackground: "#e5e7eb",
    headerTextColor: "#191919",
    rowBackgroundOdd: "transparent",
    rowBackgroundEven: "transparent",
    rowTextColor: "#111827",
    borderColor: "#e5e7eb",
    cellPadding: "1rem 0.75rem",
    expandIconColor: "#71717a",
    typography: {
      fontSize: "16px",
      fontWeight: "500",
      headerFontSize: "16px",
      headerFontWeight: "600",
    },
  },
  modals: {
    overlayColor: "rgba(0, 0, 0, 0.4)",
    background: "#ffffff",
    borderColor: "transparent",
    borderRadius: "24px",
    closeButtonColor: "#9ca3af",
    header: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#111827",
    },
    title: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#111827",
    },
    description: {
      fontSize: "14px",
      fontWeight: "400",
      color: "#6b7280",
    },
    footer: {
      primary: {
        backgroundColor: "#2563eb",
        textColor: "#ffffff",
      },
      secondary: {
        backgroundColor: "transparent",
        textColor: "#374151",
        borderColor: "#e5e7eb",
        borderWidth: "1px",
      },
    },
  },
  plans: {
    currentPlanCard: {
      header: {
        background: "#e5e7eb",
        textColor: "#111827",
      },
      gradientColor: "#e5e7eb",
    },
    planCards: {
      background: "#ffffff",
      border: {
        color: "#e5e7eb",
        width: "1px",
        radius: "1rem",
      },
      header: {
        background: "#e5e7eb",
        textColor: "#111827",
      },
      description: {
        textColor: "#6b7280",
        textButtonColor: "#2563eb",
      },
      price: {
        amountColor: "#111827",
        primaryTextColor: "#6b7280",
        secondaryTextColor: "#9ca3af",
        background: "transparent",
        borderColor: "transparent",
      },
    },
    planFeatures: {
      textColor: "#374151",
      iconColor: "#2563eb",
    },
    planButton: {
      background: "#2563eb",
      textColor: "#ffffff",
    },
    planToggle: {
      background: "#e5e7eb",
      activeBackground: "#1f2937",
      activeText: "#ffffff",
      inactiveText: "#6b7280",
    },
    planTags: {
      freeTrialBackground: "#dbeafe",
      freeTrialText: "#1e40af",
    },
  },
}

// Default theme for Pricing table (plans nested like customer portal theme.plans).
export const defaultPricingTableTheme: Record<string, unknown> = {
  plans: {
    currentPlanCard: {
      header: {
        background: "#e5e7eb",
        textColor: "#111827",
      },
      gradientColor: "#e5e7eb",
    },
    planCards: {
      background: "#ffffff",
      border: {
        color: "#e5e7eb",
        width: "1px",
        radius: "1rem",
      },
      header: {
        background: "#f9fafb",
        textColor: "#111827",
      },
      description: {
        textColor: "#6b7280",
        textButtonColor: "#2563eb",
      },
      price: {
        amountColor: "#111827",
        primaryTextColor: "#374151",
        secondaryTextColor: "#9ca3af",
        background: "transparent",
        borderColor: "transparent",
      },
    },
    planFeatures: {
      textColor: "#374151",
      iconColor: "#2563eb",
    },
    planButton: {
      background: "#2563eb",
      textColor: "#ffffff",
      secondaryBackground: "#f3f4f6",
      secondaryTextColor: "#374151",
    },
    planToggle: {
      background: "#e5e7eb",
      activeBackground: "#111827",
      activeText: "#ffffff",
      inactiveText: "#6b7280",
    },
    planTags: {
      freeTrialBackground: "#dbeafe",
      freeTrialText: "#1e40af",
    },
  },
  tabs: {
    activeText: "#2563eb",
    inactiveText: "#6b7280",
    indicator: "#2563eb",
    borderColor: "#e5e7eb",
  },
  display: {
    plansOnly: false,
    singlePurchasesOnly: false,
    showTabHeader: true,
  },
}
