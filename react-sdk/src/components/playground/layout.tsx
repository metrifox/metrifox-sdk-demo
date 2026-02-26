import { useState, useMemo, useEffect } from "react"
import { ConfigPanel } from "./config-panel"
import { Preview } from "./preview"
import { ThemeConfigPanel } from "./theme-panel"
import { defaultCustomerPortalTheme } from "../../data/default-theme"
import type { WidgetDefinition, ConfigValue } from "../../types/widget"
import metrifoxLogo from "../../assets/metrifox-logo.png"
import "./playground.css"
import { THEME } from "../../types/enums"

type LayoutProps = {
  widgets: WidgetDefinition[]
}

// Helper to set nested value immutably
const setNestedValue = (
  obj: Record<string, unknown>,
  path: string,
  value: unknown,
): Record<string, unknown> => {
  if (path.includes(".")) {
    const [head, ...tail] = path.split(".")
    const current = (obj[head] as Record<string, unknown>) || {}
    return {
      ...obj,
      [head]: setNestedValue(current, tail.join("."), value),
    }
  }
  return { ...obj, [path]: value }
}

// Helper to flatten theme object to dot notation keys
const flattenTheme = (
  obj: Record<string, unknown>,
  prefix = "theme.customerPortal",
): Record<string, unknown> => {
  return Object.keys(obj).reduce((acc: Record<string, unknown>, key: string) => {
    const value = obj[key]
    const newKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenTheme(value as Record<string, unknown>, newKey))
    } else {
      acc[newKey] = value
    }
    return acc
  }, {})
}

export const PlaygroundLayout = ({ widgets }: LayoutProps) => {
  const [activeWidgetId, setActiveWidgetId] = useState(widgets[0].id)
  // Initialize theme from system preference once; toggle updates it after
  const [themeMode, setThemeMode] = useState<typeof THEME.LIGHT | typeof THEME.DARK>(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? THEME.DARK : THEME.LIGHT
    }
    return THEME.DARK
  })
  const [activeTab, setActiveTab] = useState<"preview" | "json" | "code">("preview")
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [searchQuery, setSearchQuery] = useState("")

  // Widget Configs (API keys etc)
  const [widgetConfigs, setWidgetConfigs] = useState<Record<string, Record<string, ConfigValue>>>({})

  // Theme Config (Deeply nested object)
  const [themeConfig, setThemeConfig] = useState(defaultCustomerPortalTheme)

  const activeWidget = useMemo(
    () => widgets.find((widget) => widget.id === activeWidgetId) || widgets[0],
    [widgets, activeWidgetId],
  )

  // Filter API configs from widget definition
  const apiConfigs = useMemo(() => {
    return activeWidget.configs?.filter(c => c.section === "api") || []
  }, [activeWidget])

  const currentWidgetValues = useMemo(() => {
    const defaults: Record<string, ConfigValue> = {}
    activeWidget.configs?.forEach((config) => {
      if (config.defaultValue !== undefined) {
        defaults[config.key] = config.defaultValue
      }
    })
    return { ...defaults, ...(widgetConfigs[activeWidgetId] || {}) }
  }, [activeWidget, widgetConfigs, activeWidgetId])

  // Combine widget values (API keys) and flattened theme config
  const combinedValues = useMemo((): Record<string, ConfigValue> => {
    const flattened = flattenTheme(themeConfig as Record<string, unknown>)
    return { ...currentWidgetValues, ...flattened } as Record<string, ConfigValue>
  }, [currentWidgetValues, themeConfig])

  const handleWidgetConfigChange = (key: string, value: ConfigValue) => {
    setWidgetConfigs((prev) => ({
      ...prev,
      [activeWidgetId]: {
        ...(prev[activeWidgetId] || {}),
        [key]: value,
      },
    }))
  }

  const handleThemeChange = (path: string, value: unknown) => {
    setThemeConfig((prev) => setNestedValue(prev as Record<string, unknown>, path, value) as typeof defaultCustomerPortalTheme)
  }

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT))
  }

  // Apply theme to html element
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(themeMode)
    root.setAttribute("data-theme", themeMode)
  }, [themeMode])

  return (
    <div className={`pg-layout new-design pg-theme-${themeMode}`}>
      {/* Left Sidebar - Configuration */}
      <aside className="pg-sidebar-left">
        <div className="pg-sidebar-header">
          <div className="pg-logo">
            <img
              src={metrifoxLogo}
              alt="Metrifox"
              className="pg-logo-img"
            />
          </div>
          <div className="pg-widget-select-wrap">
            <label htmlFor="pg-widget-select" className="pg-widget-select-label">
              Widget
            </label>
            <select
              id="pg-widget-select"
              className="pg-widget-select"
              value={activeWidgetId}
              onChange={(e) => setActiveWidgetId(e.target.value)}
            >
              {widgets.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pg-sidebar-content">
          {/* API Configuration */}
          {apiConfigs.length > 0 && (
            <div className="pg-config-group">
              <h3 className="pg-group-title">API Configuration</h3>
              <div className="pg-group-content">
                <ConfigPanel
                  configs={apiConfigs}
                  values={currentWidgetValues}
                  onChange={handleWidgetConfigChange}
                />
              </div>
            </div>
          )}

          {/* Theme Settings */}
          <div className="pg-config-group">
            <h3 className="pg-group-title">THEME SETTINGS</h3>
            <div className="pg-theme-search-wrap">
              <input
                type="text"
                placeholder="Search theme..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pg-theme-search-input"
              />
            </div>
            <ThemeConfigPanel
              theme={themeConfig}
              onChange={handleThemeChange}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pg-main-area">
        {/* Top Bar */}
        <header className="pg-topbar">
          <div className="pg-tabs">
            <button
              className={`pg-tab ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              Live Preview
            </button>
            <button
              className={`pg-tab ${activeTab === 'json' ? 'active' : ''}`}
              onClick={() => setActiveTab('json')}
            >
              JSON Config
            </button>
            <button
              className={`pg-tab ${activeTab === 'code' ? 'active' : ''}`}
              onClick={() => setActiveTab('code')}
            >
              Code Snippet <span className="pg-badge">React</span>
            </button>
          </div>

          <div className="pg-toolbar">
            <a
              href={activeWidget.docsUrl || "https://docs.metrifox.com/sdks/frontend/react"}
              target="_blank"
              rel="noopener noreferrer"
              className="pg-header-link"
              title="Metrifox React SDK docs"
            >
              Docs
            </a>
            <a
              href="https://github.com/metrifox/metrifox-sdk-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="pg-header-link"
              title="View source on GitHub"
            >
              <span className="pg-header-link-text">View Source</span>
              <svg className="pg-header-link-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
            <div className="pg-divider"></div>
            <div className="pg-device-toggles">
              <button
                className={`pg-icon-btn ${previewMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setPreviewMode('desktop')}
              >
                Desktop
              </button>
              <button
                className={`pg-icon-btn ${previewMode === 'tablet' ? 'active' : ''}`}
                onClick={() => setPreviewMode('tablet')}
              >
                Tablet
              </button>
              <button
                className={`pg-icon-btn ${previewMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setPreviewMode('mobile')}
              >
                Mobile
              </button>
            </div>
            <div className="pg-divider"></div>
            <button className="pg-icon-btn" onClick={toggleThemeMode}>
              {themeMode === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="pg-content">
          {activeTab === 'preview' && (
            <Preview
              Component={activeWidget.component}
              configValues={combinedValues}
              mode={previewMode}
            />
          )}
          {activeTab === 'json' && (
            <div className="pg-code-view">
              <pre>{JSON.stringify(themeConfig, null, 2)}</pre>
            </div>
          )}
          {activeTab === 'code' && (
            <div className="pg-code-view">
              <pre>
                {activeWidgetId === 'customer-portal'
                  ? `import { CustomerPortal } from '@metrifox/react-sdk';

// ...

<CustomerPortal 
  clientKey="${currentWidgetValues.clientKey ?? ''}"
  customerKey="${currentWidgetValues.customerKey ?? ''}"
  theme={${JSON.stringify(themeConfig, null, 2)}} 
/>`
                  : activeWidgetId === 'pricing-table'
                    ? `import { PricingTable } from '@metrifox/react-sdk';

// ...

<PricingTable 
  clientKey="${currentWidgetValues.clientKey ?? ''}"
  checkoutKey="${currentWidgetValues.checkoutKey ?? ''}"
  productKey="${currentWidgetValues.productKey ?? ''}"
  theme={${JSON.stringify(themeConfig, null, 2)}} 
/>`
                    : `import { Widget } from '@metrifox/react-sdk';

// Replace with the appropriate component for ${activeWidget.name}
<Widget />`}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
