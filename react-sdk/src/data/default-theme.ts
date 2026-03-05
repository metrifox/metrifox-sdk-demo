// Default configuration for customer portal (matches CustomerPortalTheme in SDK).
export const defaultCustomerPortalTheme = {
  general: {
    linkColor: "#006FEE",
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    fontFamily: '"Space Grotesk", sans-serif',
    containerPadding: "24px",
  },
  tabs: {
    tabBackground: "#FFFFFF",
    tabBorderColor: "#E4E4E7",
    activeTabBackground: "#3D3D3D",
    activeTabTextColor: "#FFFFFF",
    inactiveTabTextColor: "#6B7280",
  },
  sections: {
    background: "#FFFFFF",
    padding: "0px",
    borderColor: "transparent",
    borderRadius: "8px",
    emptyTextColor: "#9CA3AF",
    usage: {
      barColor: "#006FEE",
      trackColor: "#E5E7EB",
    },
    content: {
      background: "#F4F4F5",
      padding: "24px",
      borderColor: "#E4E4E7",
      borderRadius: "8px",
    },
    summaryBalance: {
      background: "#FFFFFF",
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
      backgroundColor: "#3D3D3D",
      border: {
        color: "#52525B",
        width: "1px",
        radius: "8px",
      },
      typography: {
        fontSize: "14px",
        fontWeight: "500",
        color: "#FFFFFF",
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
      background: "#FFFFFF",
      borderColor: "#E5E7EB",
      typography: {
        label: { color: "#111827" },
        quantity: { color: "#6B7280" },
      },
    },
    childRow: {
      background: "#FFFFFF",
      borderColor: "#E5E7EB",
      typography: {
        label: { color: "#111827" },
        quantity: { color: "#6B7280" },
      },
    },
  },
  tables: {
    headerBackground: "#E4E4E7",
    headerTextColor: "#3D3D3D",
    rowBackgroundOdd: "transparent",
    rowBackgroundEven: "transparent",
    rowTextColor: "#3D3D3D",
    borderColor: "#E5E7EB",
    cellPadding: "1rem 0.75rem",
    expandIconColor: "#71717A",
    typography: {
      fontSize: "16px",
      fontWeight: "400",
      headerFontSize: "16px",
      headerFontWeight: "600",
    },
  },
  modals: {
    overlayColor: "rgba(0, 0, 0, 0.4)",
    background: "#FFFFFF",
    borderColor: "transparent",
    borderRadius: "24px",
    closeButtonColor: "#9CA3AF",
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
      color: "#6B7280",
    },
    footer: {
      primary: {
        backgroundColor: "#2563EB",
        textColor: "#FFFFFF",
      },
      secondary: {
        backgroundColor: "transparent",
        textColor: "#374151",
        borderColor: "#E5E7EB",
        borderWidth: "1px",
      },
    },
  },
  plans: {
    currentPlanCard: {
      header: {
        background: "#3D3D3D",
        textColor: "#FFFFFF",
      },
      gradientColor: "#DEF764",
    },
    planCards: {
      background: "#FFFFFF",
      border: {
        color: "#E5E7EB",
        width: "1px",
        radius: "1rem",
      },
      header: {
        background: "#E5E7EB",
        textColor: "#111827",
      },
      description: {
        textColor: "#6B7280",
        textButtonColor: "#2563EB",
      },
      price: {
        amountColor: "#111827",
        primaryTextColor: "#6B7280",
        secondaryTextColor: "#9CA3AF",
        background: "transparent",
        borderColor: "transparent",
      },
    },
    planFeatures: {
      textColor: "#374151",
      iconColor: "#0BB02F",
    },
    planButton: {
      background: "#3D3D3D",
      textColor: "#FFFFFF",
    },
    planToggle: {
      background: "#E4E4E7",
      activeBackground: "#3D3D3D",
      activeText: "#FFFFFF",
      inactiveText: "#6B7280",
    },
    planTags: {
      freeTrialBackground: "#DBEAFE",
      freeTrialText: "#1E40AF",
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
      iconColor: "#0BB02F",
    },
    planButton: {
      background: "#3D3D3D",
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
    activeText: "#FFFFFF",
    inactiveText: "#6b7280",
    indicator: "#FFFFFF",
    borderColor: "#3D3D3D",
  },
  display: {
    plansOnly: false,
    singlePurchasesOnly: false,
    showTabHeader: true,
  },
}