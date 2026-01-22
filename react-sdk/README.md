# Metrifox SDK Demo

A demo application showcasing the integration of the Metrifox React SDK.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/metrifox/metrifox-sdk-demo.git
    cd metrifox-sdk-demo/react-sdk
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Configuration

1.  Create a `.env` file in the root directory (or copy from an example if provided):

    ```bash
    cp .env.example .env
    ```

2.  Configure your environment variables in `.env`:

    ```env
    VITE_METRIFOX_ENV=development
    VITE_METRIFOX_BASE_URL=http://localhost:8000/api/v1
    VITE_METRIFOX_APP_SECRET=your_client_key_here
    VITE_METRIFOX_WEB_APP_URL=http://localhost:3000
    ```

    > **Note:** For the demo to work, you must provide a valid `VITE_METRIFOX_APP_SECRET` (Client Key).

## Running the App

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
