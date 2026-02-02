# Metrifox SDK Demo (Angular)

A production-ready demo application showcasing the integration of the **Metrifox Angular SDK**. This project is the Angular playground equivalent of the [React SDK demo](./react-sdk): it demonstrates how to initialize the SDK, embed widgets (Customer Portal and Pricing Table), and use the configuration panel with API keys and Theme options.

## Tech Stack

- **Angular** (v19+)
- **TypeScript**
- **Angular CLI**
- **Metrifox Angular SDK** (`@metrifox/angular-sdk`)

## Project Structure

```bash
src/
├── app/
│   ├── app.component.ts    # Main layout: sidebar, preview stage, config panel
│   ├── app.config.ts       # provideMetrifox() and app providers
│   └── theme-config.ts    # Customer Portal theme options for config panel
├── index.html
├── main.ts
└── styles.css              # Playground styles (layout, config sidebar, theme inputs)
```

## Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- **Angular SDK built locally** when using the demo with the SDK from source (see below)

### Using the published package

If you consume `@metrifox/angular-sdk` from npm, you can use the demo as a reference by changing the dependency in `package.json` from `file:../../metrifox-angular-sdk/dist` to `"@metrifox/angular-sdk": "^1.0.0"` (or latest), then:

```bash
cd angular-sdk
npm install
npm run dev
```

### Using the local SDK (playground / development)

To test the Angular SDK package **like the React SDK**—with the SDK built from the [metrifox-angular-sdk](https://github.com/metrifox/metrifox-angular-sdk) repo—use the local `dist` build:

1. **Build the Angular SDK** (in the `metrifox-angular-sdk` repo):

   ```bash
   cd path/to/metrifox-angular-sdk
   pnpm install
   pnpm run build
   ```

   This produces the `dist/` output that the demo links to.

2. **Install and run the demo** (in this repo):

   ```bash
   cd path/to/metrifox-sdk-demo/angular-sdk
   npm install
   npm run dev
   ```

   The demo’s `package.json` uses `"@metrifox/angular-sdk": "file:../../metrifox-angular-sdk/dist"`, so it will use your local build. Adjust the path if your folder layout is different.

The application will be available at `http://localhost:4200`.

## SDK Integration

### 1. Provider setup (`provideMetrifox`)

The SDK is configured in `src/app/app.config.ts` using `provideMetrifox()`. This registers `HttpClient` and `MetrifoxService` so that SDK components (Customer Portal, Pricing Table) can inject the service correctly.

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideMetrifox } from '@metrifox/angular-sdk';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    ...provideMetrifox(),
  ],
};
```

### 2. Initialization

The app calls `MetrifoxService.initialize({ clientKey, theme })` from the main component when the user enters a Client Key (and optionally theme options). This mirrors the React SDK’s `metrifoxInit()`.

### 3. Widgets

- **Customer Portal** – Renders when “Customer Portal” is selected in the sidebar. Requires Client Key and Customer Key in the config panel.
- **Pricing Table** – Renders when “Pricing Table” is selected. Requires Client Key, Checkout Username, and Product Key.

## Playground Features (same as React SDK demo)

- **Sidebar** – Switch between Customer Portal and Pricing Table.
- **Configuration panel** – Set API keys (Client Key, Customer Key for portal; Checkout Username and Product Key for pricing table).
- **Theme options** – When Customer Portal is selected, scroll down in the config panel to see Theme sections (General, Tabs, Section, Card, Button, Table, Filter, etc.) with color pickers. Changes apply live to the portal.
- **Light/Dark toggle** – Header theme toggle for the playground shell (does not change SDK theme; use the config panel for that).

## Widgets

### [Customer Portal](https://docs.metrifox.com/sdks/frontend/angular)

Displays the self-service portal: subscription, plans, upcoming invoice, billing history, payment methods, entitlements, and wallet balance. Use the config panel to set Client Key and Customer Key, and to customize the Customer Portal theme.

### [Pricing Table](https://docs.metrifox.com/sdks/frontend/angular)

Displays product pricing and plans. Use the config panel to set Client Key, Checkout Username, and Product Key.

## Troubleshooting

- **NG0203 / `_MetrifoxService` injection failed** – Ensure `provideMetrifox()` is included in `app.config.ts` and that the array is spread: `...provideMetrifox()`.
- **Widgets not loading** – Check the browser console for errors. Ensure a valid Client Key is set in the config panel and that the SDK has been initialized (the app does this when keys are present).
- **Local SDK not found** – If you use `file:../../metrifox-angular-sdk/dist`, build the Angular SDK first (`pnpm run build` in the SDK repo), then run `npm install` in the demo so the link resolves.
- **Styles missing** – The demo’s `angular.json` includes `node_modules/@metrifox/angular-sdk/src/styles.css`. If your SDK build outputs styles elsewhere, adjust the path in `angular.json` to match.

## Additional Resources

- [Angular SDK README](https://github.com/metrifox/metrifox-angular-sdk#readme)
- [Metrifox Docs](https://docs.metrifox.com)
