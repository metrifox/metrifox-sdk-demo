import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { MetrifoxSDKProvider } from "./config/metrifox-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MetrifoxSDKProvider />
    <App />
  </StrictMode>,
)
