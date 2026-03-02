import type { ComponentType } from "react"
import type { ConfigValue } from "../../../types/widget"
import "../styles/preview.css"

type PreviewProps = {
  Component: ComponentType<Record<string, ConfigValue>>
  configValues: Record<string, ConfigValue>
  mode?: "desktop" | "tablet" | "mobile"
}

export const Preview = ({ Component, configValues, mode = "desktop" }: PreviewProps) => {
  return (
    <div className="pg-preview-container">
      <div className={`pg-preview-window ${mode}`}>
        <div className="pg-window-header">
           <div className="pg-traffic-lights">
              <span className="pg-light pg-red"></span>
              <span className="pg-light pg-yellow"></span>
              <span className="pg-light pg-green"></span>
           </div>
           <div className="pg-address-bar">
             customer-portal.metrifox.com/billing
           </div>
           <div className="pg-window-actions">
               <div className="pg-header-icon"></div>
               <div className="pg-header-icon rounded"></div>
           </div>
        </div>
        <div className="pg-window-content">
          <Component {...configValues} />
        </div>
      </div>
    </div>
  )
}
