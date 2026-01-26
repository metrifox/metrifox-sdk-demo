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
        key: "customerKey",
        label: "Customer Key",
        type: "text",
        defaultValue: "cust-mkpo321o3b7q",
        placeholder: "Enter your customer key",
        section: "api",
      },
      {
        key: "clientKey",
        label: "Client Key",
        type: "text",
        defaultValue: "tPVJP9Sw87rO4OWMpDtXDRzjDH1iw4bh_uShZqh1xUU",
        placeholder: "Enter your client key",
        section: "api",
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
        key: "checkoutKey",
        label: "Checkout Username",
        type: "text",
        defaultValue: "checkout_demo_user",
        section: "api",
      },

      {
        key: "productKey",
        label: "Product Key",
        type: "text",
        defaultValue: "prod_demo_123",
        section: "api",
      },
      // Theme - Card
      {
        key: "theme.card.background",
        label: "Card Background",
        type: "color",
        defaultValue: "#ffffff",
        section: "Theme: Card",
      },
      {
        key: "theme.card.price.amountColor",
        label: "Price Amount Color",
        type: "color",
        defaultValue: "#111827",
        section: "Theme: Card",
      },
      {
        key: "theme.card.price.textButtonColor",
        label: "Price Button Text Color",
        type: "color",
        defaultValue: "#2563eb",
        section: "Theme: Card",
      },
      // Theme - Button
      {
        key: "theme.button.background",
        label: "Button Background",
        type: "color",
        defaultValue: "#2563eb",
        section: "Theme: Button",
      },
      {
        key: "theme.button.textColor",
        label: "Button Text Color",
        type: "color",
        defaultValue: "#ffffff",
        section: "Theme: Button",
      },
      // Theme - Feature List
      {
        key: "theme.featureList.iconColor",
        label: "Feature Icon Color",
        type: "color",
        defaultValue: "#2563eb",
        section: "Theme: Features",
      },
      // Theme - Tabs
      {
        key: "theme.tabs.activeText",
        label: "Active Tab Text",
        type: "color",
        defaultValue: "#2563eb",
        section: "Theme: Tabs",
      },
    ],
  },
]
