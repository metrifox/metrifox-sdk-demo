# MetriFox React SDK

A fully-configurable **React SDK** providing ready-to-use widgets for SaaS and billing platforms including customer portals, billing sections, and more.

---

## Installation

```bash
# using npm
npm install @metrifox/react-sdk

# or pnpm
pnpm add @metrifox/react-sdk

# or yarn
yarn add @metrifox/react-sdk
```

---

## Setup

Before using any SDK components, initialize it once with your Client key.

```tsx
import { metrifoxInit } from "@metrifox/react-sdk"

metrifoxInit({
  clientKey:
    process.env.NEXT_PUBLIC_METRIFOX_APP_SECRET ||
    process.env.REACT_APP_METRIFOX_APP_SECRET ||
    import.meta.env?.VITE_METRIFOX_APP_SECRET ||
    "your-client-key",
})
```

> Works with **React**, **Next.js**, and other frameworks using React 18+.

---

## Widgets

## `CustomerPortal`

Displays a customizable customer dashboard with plans, subscriptions, billing, credits, and more.

```tsx
import { CustomerPortal } from "@metrifox/react-sdk"

const MyCustomPlan = ({ foo }) => <div>Custom Plan! Foo: {foo}</div>

export default function MyPortalPage() {
  return (
    <CustomerPortal
      customerKey="your-customer-key"
      sectionsConfig={[
        { key: "subscription" },
        { key: "plan", component: MyCustomPlan, props: { foo: "bar" } },
        { key: "billingHistory", hidden: true },
      ]}
      theme={{ general: { linkColor: "#2563eb" } }}
    />
  )
}
```

Optional **`theme`** prop: pass a `CustomerPortalTheme` object to override or extend the global theme from `metrifoxInit` for this instance only.

#### Section Configuration

The `sectionsConfig` prop controls what appears in the portal.

| Property    | Type                      | Description                                         |
| ----------- | ------------------------- | --------------------------------------------------- |
| `key`       | `SectionKey`              | Unique key of the section (see list below)          |
| `hidden`    | `boolean`                 | Hide this section when `true`                       |
| `component` | `React.ComponentType`     | Replace the default section with your own component |
| `props`     | `Record<string, unknown>` | Extra props passed to the custom or default section |

#### Built-in Section Keys

| Key                | Description                   |
| ------------------ | ----------------------------- |
| `upcomingInvoice`  | Displays next invoice details |
| `subscription`     | Active subscription overview  |
| `walletBalance`    | Shows user wallet balance     |
| `entitlementUsage` | Displays resource usage       |
| `paymentOverview`  | Payment summary and methods   |
| `billingHistory`   | List of past transactions     |
| `plan`             | Current plan details          |

#### Section Anchors

Each portal section renders inside a `<section id="...">` wrapper so you can link directly to segments of a customer portal view. The default anchor IDs are:

| Anchor ID            | Section Key        |
| -------------------- | ------------------ |
| `#upcoming-invoice`  | `upcomingInvoice`  |
| `#subscription`      | `subscription`     |
| `#credit-balance`    | `creditBalance`    |
| `#entitlement-usage` | `entitlementUsage` |
| `#payment-overview`  | `paymentOverview`  |
| `#billing-history`   | `billingHistory`   |
| `#plan`              | `plan`             |

Use these anchors when embedding the SDK or sharing deep links (e.g., `https://app.example.com/portal#billing-history`).

---

## Pricing Table

Displays subscription plans and one-time purchases in a configurable pricing table component.

```tsx
import { PricingTable } from "@metrifox/react-sdk"

export default function PricingPage() {
  return (
    <PricingTable
      checkoutUsername="your-checkout-username"
      productKey="your-product-key"
      theme={{ plans: { planCards: { background: "#ffffff" } } }}
    />
  )
}
```

---

#### Props

The props control how the pricing table is configured.

| Property              | Type               | Required | Default | Description                                                                      |
| --------------------- | ------------------ | -------- | ------- | -------------------------------------------------------------------------------- |
| `checkoutUsername`    | `string`           | Yes      | —       | Unique username used for checkout. This can be found in **Settings → Checkout**. |
| `productKey`          | `string`           | Yes      | —       | Unique product identifier. This can be found on the product page.                |
| `plansOnly`           | `boolean`          | No       | `false` | Controls whether only subscription plans are rendered.                           |
| `singlePurchasesOnly` | `boolean`          | No       | `false` | Controls whether only single purchases are rendered.                             |
| `showTabHeader`       | `boolean`          | No       | `true`  | Controls whether the tab header for switching between offerings is rendered.     |
| `theme`               | `PricingTableTheme`| No       | —       | Optional theme override for this instance (merged with global theme from `metrifoxInit`). |

> **Note:** If both `plansOnly` and `singlePurchasesOnly` are `false` or undefined, both plans and single purchases are displayed.

## Styling

Import the SDK's global styles into your app entry (e.g., `src/index.tsx` or `_app.tsx`):

```tsx
import "@metrifox/react-sdk/dist/styles.css"
```

> This is required for proper styling of all widgets.

### Theme configuration

Theming is driven by a single `theme` object passed to `metrifoxInit`. It has two top-level keys: `customerPortal` and `pricingTable`. Any value you omit falls back to the SDK default. You can also pass an optional `theme` prop to `<CustomerPortal />` or `<PricingTable />` to override or extend the global theme for that instance.

```ts
// Passed to metrifoxInit({ theme })
theme?: {
  customerPortal?: CustomerPortalTheme
  pricingTable?: PricingTableTheme
}
```

---

### Customer Portal theme (`CustomerPortalTheme`)

All properties are optional. The shape is grouped by area of the UI:

| Group | Description |
| ----- | ----------- |
| `general` | Page-level: link color, background, border radius, font family, container padding |
| `tabs` | Tab bar (e.g. Wallet balance tabs): background, border, active/inactive states |
| `sections` | Section cards: background, padding, borders, content/summaryBalance sub-styles, header/label/value typography, usage bars, empty text |
| `buttons` | Primary and secondary buttons: background, border (color/width/radius), typography |
| `lineItems` | Subscription line items: parentRow/childRow background, border, typography (label/quantity) |
| `tables` | Tables (e.g. billing history): header/row colors, border, cell padding, expand icon, typography |
| `modals` | Modal overlay, background, border, close button; header/title/description typography; footer primary/secondary buttons |
| `plans` | Plan cards when shown in portal: currentPlanCard, planCards (border as `{ color, width, radius }`), planFeatures, planButton, planToggle, planTags |

**Example – minimal override:**

```ts
customerPortal: {
  general: { linkColor: "#2563eb", backgroundColor: "#ffffff" },
  tabs: {
    tabBackground: "#ffffff",
    tabBorderColor: "#e5e7eb",
    activeTabBackground: "#2563eb",
    activeTabTextColor: "#ffffff",
    inactiveTabTextColor: "#6b7280",
  },
  sections: {
    background: "#ffffff",
    content: { background: "#f4f4f5", borderRadius: "8px" },
    header: { fontSize: "16px", fontWeight: "600", color: "#52525b" },
    label: { fontSize: "13px", color: "#71717a" },
    value: { fontSize: "16px", color: "#52525b" },
  },
  buttons: {
    primary: { backgroundColor: "#2563eb", border: { radius: "8px" }, typography: { color: "#ffffff" } },
    secondary: { backgroundColor: "#e4e4e7", typography: { color: "#3f3f46" } },
  },
  plans: {
    planCards: {
      background: "#ffffff",
      border: { color: "#e5e7eb", width: "1px", radius: "8px" },
      header: { background: "#e5e7eb", textColor: "#111827" },
      description: { textColor: "#6b7280", textButtonColor: "#2563eb" },
      price: { amountColor: "#111827", primaryTextColor: "#6b7280", secondaryTextColor: "#9ca3af" },
    },
    planButton: { background: "#2563eb", textColor: "#ffffff" },
    planToggle: { background: "#e5e7eb", activeBackground: "#1f2937", activeText: "#ffffff", inactiveText: "#6b7280" },
  },
}
```

---

### Font customization

The SDK accepts **any font-family string** in your theme. The SDK applies it via CSS, but **your app must load the font** (Google Fonts, @font-face, etc.) before the SDK renders.

**How it works:**

1. **Load the font in your app** (HTML, CSS, or framework-specific):

```html
<!-- Option A: Google Fonts in your HTML <head> -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
/* Option B: @font-face in your global CSS */
@font-face {
  font-family: 'MyCustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
}
```

2. **Pass the font-family to the SDK theme:**

```tsx
metrifoxInit({
  theme: {
    customerPortal: {
      general: { 
        // Any font-family string works
        fontFamily: '"Space Grotesk", "Inter", sans-serif'
        // or: 'MyCustomFont, sans-serif'
        // or: 'system-ui, -apple-system, sans-serif'
      }
    }
  }
})
```

If no `fontFamily` is provided, the SDK inherits the font from the host page. This means the SDK works with whatever font your app already uses — no extra configuration needed.

> **Important:** When using Google Fonts or custom fonts, load them in your app **before** the SDK initializes to prevent flash of unstyled text (FOUT).

---

### Pricing Table theme (`PricingTableTheme`)

The Pricing Table theme follows the same nested structure as Customer Portal. All plan-related keys must be nested under `plans`.

| Key | Description |
| --- | ----------- |
| `plans` | Container for all plan-related styling |
| `plans.currentPlanCard` | Current-plan highlight: header (background, textColor), gradientColor, description, borderRadius |
| `plans.planCards` | Card style: background, border (`{ color, width, radius }`), header, description (textColor, textButtonColor), price (amountColor, primaryTextColor, secondaryTextColor, textButtonColor, background, borderColor) |
| `plans.planFeatures` | Feature list: textColor, iconColor |
| `plans.planButton` | CTA button: background, textColor; optional secondaryBackground, secondaryTextColor, textButtonColor |
| `plans.planToggle` | Monthly/Yearly toggle: background, activeBackground, activeText, inactiveText |
| `plans.planTags` | Tags (e.g. free trial): freeTrialBackground, freeTrialText |
| `tabs` | Tabs (e.g. Plans vs Single purchases): inactiveText, activeText, indicator, borderColor |
| `checkoutBar` | Bottom checkout bar: background, borderColor, textColor, buttonBackground, buttonTextColor |

**Example – minimal override:**

```ts
pricingTable: {
  plans: {
    planCards: {
      background: "#ffffff",
      border: { color: "#e5e7eb", width: "1px", radius: "8px" },
      header: { background: "#e5e7eb", textColor: "#111827" },
      description: { textColor: "#6b7280", textButtonColor: "#2563eb" },
      price: { amountColor: "#111827", primaryTextColor: "#6b7280", secondaryTextColor: "#9ca3af" },
    },
    planButton: { background: "#2563eb", textColor: "#ffffff" },
    planToggle: { background: "#e5e7eb", activeBackground: "#1f2937", activeText: "#ffffff", inactiveText: "#6b7280" },
  },
  tabs: { activeText: "#2563eb", indicator: "#2563eb", borderColor: "#9ca3af" },
  checkoutBar: {
    background: "#f9fafb",
    borderColor: "#e5e7eb",
    textColor: "#3f3f46",
    buttonBackground: "#2563eb",
    buttonTextColor: "#ffffff",
  },
}
```

When the Pricing Table is embedded inside the Customer Portal, it automatically uses `theme.customerPortal.plans` for plan styling so both widgets stay consistent.

---

### Full example

```tsx
import { metrifoxInit } from "@metrifox/react-sdk"

metrifoxInit({
  clientKey: "your-client-key",
  theme: {
    customerPortal: {
      general: { linkColor: "#2563eb", backgroundColor: "#ffffff" },
      tabs: {
        tabBackground: "#ffffff",
        activeTabBackground: "#2563eb",
        activeTabTextColor: "#ffffff",
        inactiveTabTextColor: "#6b7280",
      },
      sections: {
        background: "#ffffff",
        content: { background: "#f4f4f5", borderRadius: "8px" },
      },
      buttons: {
        primary: { backgroundColor: "#2563eb", typography: { color: "#ffffff" } },
      },
    },
    pricingTable: {
      plans: {
        planCards: { background: "#ffffff", border: { color: "#e5e7eb", radius: "8px" } },
        planButton: { background: "#2563eb", textColor: "#ffffff" },
      },
      tabs: { activeText: "#2563eb", indicator: "#2563eb" },
      checkoutBar: { buttonBackground: "#2563eb", buttonTextColor: "#ffffff" },
    },
  },
})
```

Per-widget overrides (optional):

```tsx
<CustomerPortal customerKey="..." theme={{ general: { linkColor: "#1d4ed8" } }} />
<PricingTable checkoutUsername="..." productKey="..." theme={{ plans: { planCards: { background: "#f8fafc" } } }} />
```

---

## Local Development

### Using [yalc](https://github.com/wclr/yalc)

For local SDK testing:

```bash
# In SDK project
pnpm build
npx yalc publish

# In consuming app
npx yalc add @metrifox/react-sdk
pnpm install
```

#### Auto-update during development

```bash
# In SDK project
pnpm dev:build   # watch & rebuild
pnpm dev:link    # re-publish build to yalc

# In consuming project
npx yalc update @metrifox/react-sdk
```

#### Clean up

```bash
npx yalc remove @metrifox/react-sdk
pnpm install
```

---

## Support

📘 **Full Documentation:**
For detailed guides, API references, and live examples, visit [docs.metrifox.com](https://docs.metrifox.com).

---

## 📄 License

MIT © [MetriFox](https://metrifox.com)
