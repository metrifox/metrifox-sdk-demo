import type { ComponentType } from "react"
import type { ConfigValue } from "../../types/widget"

type PreviewProps = {
  Component: ComponentType<Record<string, ConfigValue>>
  configValues: Record<string, ConfigValue>
}

export const Preview = ({ Component, configValues }: PreviewProps) => {
  return (
    <div className="pg-preview-wrapper">
      <div className="pg-preview-stage">
        <div className="pg-stage-label">Preview Stage</div>
        <div className="pg-stage-content">
          <Component {...configValues} />
        </div>
      </div>
    </div>
  )
}
