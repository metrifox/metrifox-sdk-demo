# Metrifox SDK Demo

A production-ready demo application showcasing the integration of the **Metrifox React SDK**. This project demonstrates how to initialize the SDK, manage authentication, and embed widgets like the Customer Portal and Pricing Table.

## Tech Stack

- **React** (v18+)
- **TypeScript**
- **Vite**
- **Metrifox React SDK** (`@metrifox/react-sdk`)

## Project Structure

```bash
src/
├── config/
│   └── metrifox-provider.tsx  # SDK Initialization & Context
├── modules/
│   ├── customer-portal/       # Customer Portal Widget integration
│   └── pricing-table/         # Pricing Table Widget integration
├── types/                     # Shared types and enums
└── App.tsx                    # Main application layout
```

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

## Widgets

This demo includes implementations of the following widgets:

### Customer Portal

Located in `src/modules/customer-portal/`. Renders the self-service portal for customers to manage their subscriptions and billing details.

### Pricing Table

Located in `src/modules/pricing-table/`. Displays product pricing tiers and allows users to subscribe to plans.

## Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/metrifox/metrifox-sdk-demo.git
    cd metrifox-sdk-demo/react-sdk
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

## Troubleshooting

- **Widgets not loading**: Check the browser console for authentication errors. Ensure the hardcoded Client Key in `src/config/metrifox-provider.tsx` is valid.
