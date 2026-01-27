import { CustomerPortalWidget } from "../modules/customer-portal"
import type { WidgetDefinition } from "../types/widget"

import { PricingTableWidget } from "../modules/pricing-table"

export const widgetCatalog: WidgetDefinition[] = [
  {
    id: "customer-portal",
    name: "Customer Portal",
    description: "Self-serve portal for invoices, payment methods, and secure support.",
    status: "Live",
    docsUrl: "https://docs.metrifox.com/sdks/frontend/react#core-widget:-customerportal",
    highlights: [""],
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    component: CustomerPortalWidget,
    configs: [
      {
        key: "clientKey",
        label: "Client Key",
        type: "text",
        defaultValue: "tPVJP9Sw87rO4OWMpDtXDRzjDH1iw4bh_uShZqh1xUU",
        placeholder: "Enter your client key",
        section: "api",
      },
      {
        key: "customerKey",
        label: "Customer Key",
        type: "text",
        defaultValue: "cust-mkpo1rd3u91j",
        placeholder: "Enter your customer key",
        section: "api",
      },
      // Theme - General
      {
        key: "theme.customerPortal.linkColor",
        label: "Link Color",
        type: "color",
        defaultValue: "#2563eb",
        section: "Theme: General",
      },
      // Theme - Tabs
      {
        key: "theme.customerPortal.tabs.background",
        label: "Tab Background",
        type: "color",
        defaultValue: "#ffffff",
        section: "Theme: Tabs",
      },
      {
        key: "theme.customerPortal.tabs.borderColor",
        label: "Tab Border Color",
        type: "color",
        defaultValue: "#e5e7eb",
        section: "Theme: Tabs",
      },
      {
        key: "theme.customerPortal.tabs.activeBackground",
        label: "Active Tab Background",
        type: "color",
        defaultValue: "#eff6ff",
        section: "Theme: Tabs",
      },
      {
        key: "theme.customerPortal.tabs.activeTextColor",
        label: "Active Tab Text",
        type: "color",
        defaultValue: "#2563eb",
        section: "Theme: Tabs",
      },
      {
        key: "theme.customerPortal.tabs.inactiveTextColor",
        label: "Inactive Tab Text",
        type: "color",
        defaultValue: "#6b7280",
        section: "Theme: Tabs",
      },
      // Theme - Section
      {
        key: "theme.customerPortal.section.background",
        label: "Section Background",
        type: "color",
        defaultValue: "#f1eaea",
        section: "Theme: Section",
      },
      {
        key: "theme.customerPortal.section.titleTextColor",
        label: "Section Title Color",
        type: "color",
        defaultValue: "#111827",
        section: "Theme: Section",
      },
      {
        key: "theme.customerPortal.section.contentBackground",
        label: "Section Content Background",
        type: "color",
        defaultValue: "#ffffff",
        section: "Theme: Section",
      },
      {
        key: "theme.customerPortal.section.iconBackground",
        label: "Section Icon Background",
        type: "color",
        defaultValue: "#f3f4f6",
        section: "Theme: Section",
      },
      {
        key: "theme.customerPortal.section.iconColor",
        label: "Section Icon Color",
        type: "color",
        defaultValue: "#4b5563",
        section: "Theme: Section",
      },
      {
        key: "theme.customerPortal.section.emptyTextColor",
        label: "Section Empty Text",
        type: "color",
        defaultValue: "#6b7280",
        section: "Theme: Section",
      },
      // Theme - Card
      {
        key: "theme.customerPortal.card.titleBackground",
        label: "Card Title Background",
        type: "color",
        defaultValue: "#f9fafb",
        section: "Theme: Card",
      },
      {
        key: "theme.customerPortal.card.contentBackground",
        label: "Card Content Background",
        type: "color",
        defaultValue: "#ffffff",
        section: "Theme: Card",
      },
      {
        key: "theme.customerPortal.card.titleColor",
        label: "Card Title Color",
        type: "color",
        defaultValue: "#111827",
        section: "Theme: Card",
      },
      {
        key: "theme.customerPortal.card.details.labelColor",
        label: "Card Label Color",
        type: "color",
        defaultValue: "#6b7280",
        section: "Theme: Card",
      },
      {
        key: "theme.customerPortal.card.details.valueColor",
        label: "Card Value Color",
        type: "color",
        defaultValue: "#111827",
        section: "Theme: Card",
      },
      // Theme - Subscription
      {
        key: "theme.customerPortal.subscription.items.background",
        label: "Sub Item Background",
        type: "color",
        defaultValue: "#ffffff",
        section: "Theme: Subscription",
      },
      {
        key: "theme.customerPortal.subscription.items.borderColor",
        label: "Sub Item Border",
        type: "color",
        defaultValue: "#e5e7eb",
        section: "Theme: Subscription",
      },
      {
        key: "theme.customerPortal.subscription.items.textColor",
        label: "Sub Item Text",
        type: "color",
        defaultValue: "#111827",
        section: "Theme: Subscription",
      },
      // Theme - Table
      {
        key: "theme.customerPortal.table.headerTextColor",
        label: "Table Header Text",
        type: "color",
        defaultValue: "#6b7280",
        section: "Theme: Table",
      },
      {
        key: "theme.customerPortal.table.textColor",
        label: "Table Text Color",
        type: "color",
        defaultValue: "#111827",
        section: "Theme: Table",
      },
      // Theme - Button
      {
        key: "theme.customerPortal.button.background",
        label: "Button Background",
        type: "color",
        defaultValue: "#2563eb",
        section: "Theme: Button",
      },
      {
        key: "theme.customerPortal.button.textColor",
        label: "Button Text Color",
        type: "color",
        defaultValue: "#ffffff",
        section: "Theme: Button",
      },
      // Theme - Filter
      {
        key: "theme.customerPortal.filter.border",
        label: "Filter Border",
        type: "color",
        defaultValue: "#e5e7eb",
        section: "Theme: Filter",
      },
      {
        key: "theme.customerPortal.filter.activeBackground",
        label: "Filter Active Background",
        type: "color",
        defaultValue: "#eff6ff",
        section: "Theme: Filter",
      },
      {
        key: "theme.customerPortal.filter.inactiveBackground",
        label: "Filter Inactive Background",
        type: "color",
        defaultValue: "#ffffff",
        section: "Theme: Filter",
      },
      {
        key: "theme.customerPortal.filter.activeTextColor",
        label: "Filter Active Text",
        type: "color",
        defaultValue: "#2563eb",
        section: "Theme: Filter",
      },
      {
        key: "theme.customerPortal.filter.inactiveTextColor",
        label: "Filter Inactive Text",
        type: "color",
        defaultValue: "#6b7280",
        section: "Theme: Filter",
      },
      {
        key: "theme.customerPortal.filter.countBackground",
        label: "Filter Count Background",
        type: "color",
        defaultValue: "#dbeafe",
        section: "Theme: Filter",
      },
      {
        key: "theme.customerPortal.filter.countTextColor",
        label: "Filter Count Text",
        type: "color",
        defaultValue: "#1e40af",
        section: "Theme: Filter",
      },
    ],
  },
  {
    id: "pricing-table",
    name: "Pricing Table",
    description:
      "Composable pricing surfaces that update in real time across touchpoints.",
    status: "Live",
    docsUrl: "https://docs.metrifox.com/sdks/frontend/react#pricing-table",
    highlights: [""],
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1147 12.2678 21.1665 12.005 21.1665C11.7422 21.1665 11.4819 21.1147 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9632 10.9653 21.1726 11.4728 21.1726 12C21.1726 12.5272 20.9632 13.0347 20.59 13.41V13.41Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 7H7.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    component: PricingTableWidget,
    configs: [
      {
        key: "clientKey",
        label: "Client Key",
        type: "text",
        defaultValue: "tPVJP9Sw87rO4OWMpDtXDRzjDH1iw4bh_uShZqh1xUU",
        section: "api",
      },
      {
        key: "checkoutKey",
        label: "Checkout Username",
        type: "text",
        defaultValue: "sandbox-adedapo-s-inc",
        section: "api",
      },

      {
        key: "productKey",
        label: "Product Key",
        type: "text",
        defaultValue: "product_metrifox_billing_product_fc6c",
        section: "api",
      },
      {
        key: "plansOnly",
        label: "Plans Only",
        type: "boolean",
        defaultValue: false,
        section: "Display Options",
      },
      {
        key: "singlePurchasesOnly",
        label: "Single Purchases Only",
        type: "boolean",
        defaultValue: false,
        section: "Display Options",
      },
      {
        key: "showTabHeader",
        label: "Show Tab Header",
        type: "boolean",
        defaultValue: true,
        section: "Display Options",
      },
      // Theme - Card
      {
        key: "theme.pricingTable.card.background",
        label: "Card Background",
        type: "color",
        defaultValue: "#ffffff",
        section: "Theme: Card",
      },
      {
        key: "theme.pricingTable.card.borderColor",
        label: "Card Border Color",
        type: "color",
        defaultValue: "#e5e7eb",
        section: "Theme: Card",
      },
      {
        key: "theme.pricingTable.card.header.background",
        label: "Card Header Background",
        type: "color",
        defaultValue: "#f9fafb",
        section: "Theme: Card",
      },
      {
        key: "theme.pricingTable.card.header.textColor",
        label: "Card Header Text Color",
        type: "color",
        defaultValue: "#111827",
        section: "Theme: Card",
      },
      {
        key: "theme.pricingTable.card.description.textColor",
        label: "Card Description Text",
        type: "color",
        defaultValue: "#6b7280",
        section: "Theme: Card",
      },
      {
        key: "theme.pricingTable.card.price.amountColor",
        label: "Price Amount Color",
        type: "color",
        defaultValue: "#111827",
        section: "Theme: Card Price",
      },
      {
        key: "theme.pricingTable.card.price.primaryTextColor",
        label: "Price Primary Text",
        type: "color",
        defaultValue: "#374151",
        section: "Theme: Card Price",
      },
      {
        key: "theme.pricingTable.card.price.secondaryTextColor",
        label: "Price Secondary Text",
        type: "color",
        defaultValue: "#9ca3af",
        section: "Theme: Card Price",
      },
      {
        key: "theme.pricingTable.card.price.background",
        label: "Price Background",
        type: "color",
        defaultValue: "#ffffff",
        section: "Theme: Card Price",
      },
      // Theme - Button
      {
        key: "theme.pricingTable.button.background",
        label: "Button Background",
        type: "color",
        defaultValue: "#2563eb",
        section: "Theme: Button",
      },
      {
        key: "theme.pricingTable.button.textColor",
        label: "Button Text Color",
        type: "color",
        defaultValue: "#ffffff",
        section: "Theme: Button",
      },
      {
        key: "theme.pricingTable.button.secondaryBackground",
        label: "Secondary Button Background",
        type: "color",
        defaultValue: "#f3f4f6",
        section: "Theme: Button",
      },
      {
        key: "theme.pricingTable.button.secondaryTextColor",
        label: "Secondary Button Text",
        type: "color",
        defaultValue: "#374151",
        section: "Theme: Button",
      },
      // Theme - Feature List
      {
        key: "theme.pricingTable.featureList.textColor",
        label: "Feature Text Color",
        type: "color",
        defaultValue: "#374151",
        section: "Theme: Features",
      },
      {
        key: "theme.pricingTable.featureList.iconColor",
        label: "Feature Icon Color",
        type: "color",
        defaultValue: "#2563eb",
        section: "Theme: Features",
      },
      // Theme - Tabs
      {
        key: "theme.pricingTable.tabs.activeText",
        label: "Active Tab Text",
        type: "color",
        defaultValue: "#2563eb",
        section: "Theme: Tabs",
      },
      {
        key: "theme.pricingTable.tabs.inactiveText",
        label: "Inactive Tab Text",
        type: "color",
        defaultValue: "#6b7280",
        section: "Theme: Tabs",
      },
      {
        key: "theme.pricingTable.tabs.indicator",
        label: "Tab Indicator",
        type: "color",
        defaultValue: "#2563eb",
        section: "Theme: Tabs",
      },
      {
        key: "theme.pricingTable.tabs.borderColor",
        label: "Tab Border Color",
        type: "color",
        defaultValue: "#e5e7eb",
        section: "Theme: Tabs",
      },
    ],
  },
]
