# Metrifox SDK Demo (React)

A production-ready demo application showcasing the integration of the **Metrifox React SDK**. This project demonstrates how to initialize the SDK, manage authentication, and embed widgets like the Customer Portal and Pricing Table.

## Tech Stack

- **React** (v19+)
- **TypeScript**
- **Vite**
- **Metrifox React SDK** (`@metrifox/react-sdk`)

## Project Structure

```bash
src/
├── components/
│   └── playground/            # Playground UI (preview, theme panel, config)
├── config/
│   └── metrifox-provider.tsx  # SDK Initialization & Context
├── data/
│   └── default-theme.ts       # Default Customer Portal theme (matches SDK)
├── modules/
│   ├── customer-portal/       # Customer Portal Widget integration
│   └── pricing-table/         # Pricing Table Widget integration
├── types/                     # Shared types and enums
└── App.tsx                    # Main application layout
```

## Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Navigate to the project directory (if not already there):

    ```bash
    cd react-sdk
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## SDK Integration

### 1. Initialization (`MetrifoxSDKProvider`)

The SDK is initialized centrally in `src/config/metrifox-provider.tsx`. This provider ensures the SDK is ready before any child components attempt to render SDK widgets.

### 2. Usage

Wrap your application with the provider in `main.tsx`:

```tsx
<MetrifoxSDKProvider>
  <App />
</MetrifoxSDKProvider>
```

## Playground & theme

The demo includes a **playground** where you can:

- **Preview** the Customer Portal or Pricing Table in desktop/tablet/mobile view.
- **Edit theme** via the theme panel. The config matches the SDK’s `CustomerPortalTheme`: `general`, `tabs`, `sections`, `buttons`, `lineItems`, `tables`, `modals`, `plans`. The default theme lives in `src/data/default-theme.ts` and is kept in sync with the SDK default theme.
- **Configure** API keys and other widget options in the config panel.

Theme changes and config values are applied live to the preview and can be copied as JSON or code.

## Widgets

This demo includes implementations of the following widgets:

### [Customer Portal](https://docs.metrifox.com/sdks/frontend/react#core-widget:-customerportal)

Located in `src/modules/customer-portal/`. Renders the self-service portal for customers to manage their subscriptions and billing details.

![Customer Portal Light](./assets/customer-portal-light.png)

### [Pricing Table](https://docs.metrifox.com/sdks/frontend/react#pricing-table)

Located in `src/modules/pricing-table/`. Displays product pricing tiers and allows users to subscribe to plans.

![Pricing Table Light](./assets/pricing-table-light.png)

## Troubleshooting

- **Widgets not loading**: Check the browser console for authentication errors. Ensure the hardcoded Client Key in `src/config/metrifox-provider.tsx` is valid.
