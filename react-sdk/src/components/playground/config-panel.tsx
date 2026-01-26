import type { WidgetConfigParam, ConfigValue } from "../../types/widget"

type ConfigPanelProps = {
  configs?: WidgetConfigParam[]
  values: Record<string, ConfigValue>
  onChange: (key: string, value: ConfigValue) => void
  collapsed?: boolean
}

export const ConfigPanel = ({
  configs,
  values,
  onChange,
  collapsed,
}: ConfigPanelProps) => {
  // Always render the structure, but hide content if collapsed

  return (
    <div className="pg-config-panel">
      {/* Header */}
      {!collapsed && (
        <div className="pg-config-header">
          <h3>Configuration</h3>
        </div>
      )}

      {collapsed ? null : (
        <>
          <div className="pg-config-content">
            {!configs || configs.length === 0 ? (
              <div className="pg-config-panel empty">
                <p>No configuration options available.</p>
              </div>
            ) : (
              (() => {
                const sections = Array.from(
                  new Set(configs.map((config) => config.section || "general")),
                )
                return sections.map((section) => (
                  <div key={section} className="pg-config-section">
                    <h4 className="pg-section-title uppercase">{section}</h4>
                    {configs
                      .filter((config) => (config.section || "general") === section)
                      .map((config) => (
                        <div key={config.key} className="pg-form-group">
                          <label htmlFor={config.key} className="pg-label">
                            {config.label}
                          </label>
                          {config.type === "text" && (
                            <input
                              id={config.key}
                              type="text"
                              className="pg-input"
                              value={(values[config.key] as string) || ""}
                              placeholder={config.placeholder}
                              onChange={(e) => onChange(config.key, e.target.value)}
                            />
                          )}
                          {config.type === "color" && (
                            <div
                              className="color-input-wrapper"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <input
                                id={config.key}
                                type="color"
                                className="pg-color"
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  padding: 0,
                                  border: "none",
                                  background: "transparent",
                                }}
                                value={(values[config.key] as string) || "#000000"}
                                onChange={(e) => onChange(config.key, e.target.value)}
                              />
                              <span
                                className="color-value"
                                style={{ fontSize: "14px", fontFamily: "monospace" }}
                              >
                                {values[config.key] as string}
                              </span>
                            </div>
                          )}
                          {config.type === "boolean" && (
                            <label
                              className="pg-toggle"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={!!values[config.key]}
                                onChange={(e) => onChange(config.key, e.target.checked)}
                              />
                              <span>Enabled</span>
                            </label>
                          )}
                          {config.type === "select" && (
                            <select
                              className="pg-select"
                              value={(values[config.key] as string | number) || ""}
                              onChange={(e) => onChange(config.key, e.target.value)}
                            >
                              {config.options?.map((opt) => (
                                <option key={String(opt.value)} value={String(opt.value)}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      ))}
                  </div>
                ))
              })()
            )}
          </div>
        </>
      )}
    </div>
  )
}
