import { useState, useMemo, useEffect } from "react"
import { ConfigPanel } from "./config-panel"
import { Preview } from "./preview"
import { ThemeConfigPanel } from "./theme-panel"
import type { WidgetDefinition, ConfigValue } from "../../types/widget"
import metrifoxLogo from "../../assets/metrifox-logo.png"
import "./playground.css"
import { THEME } from "../../types/enums"

type LayoutProps = { widgets: WidgetDefinition[] }

function setNestedValue(
  obj: Record<string, unknown>,
  path: string,
  value: unknown,
): Record<string, unknown> {
  if (path.includes(".")) {
    const [head, ...tail] = path.split(".")
    const current = (obj[head] as Record<string, unknown>) || {}
    return { ...obj, [head]: setNestedValue(current, tail.join("."), value) }
  }
  return { ...obj, [path]: value }
}

function flattenTheme(
  obj: Record<string, unknown>,
  prefix: string,
): Record<string, unknown> {
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

export function PlaygroundLayout({ widgets }: LayoutProps) {
  const [activeWidgetId, setActiveWidgetId] = useState(widgets[0].id)
  const [themeMode, setThemeMode] = useState<typeof THEME.LIGHT | typeof THEME.DARK>(() =>
    typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
      ? THEME.DARK
      : THEME.LIGHT,
  )
  const [activeTab, setActiveTab] = useState<"preview" | "json" | "code">("preview")
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [searchQuery, setSearchQuery] = useState("")
  const [widgetConfigs, setWidgetConfigs] = useState<Record<string, Record<string, ConfigValue>>>({})
  const [widgetThemeConfigs, setWidgetThemeConfigs] = useState<Record<string, Record<string, unknown>>>({})

  const activeWidget = useMemo(
    () => widgets.find((w) => w.id === activeWidgetId) ?? widgets[0],
    [widgets, activeWidgetId],
  )
  const themeScope = activeWidget.themeScope ?? "customerPortal"

  const activeTheme = useMemo(
    () =>
      (widgetThemeConfigs[activeWidgetId] ?? activeWidget.defaultTheme ?? {}) as Record<string, unknown>,
    [widgetThemeConfigs, activeWidgetId, activeWidget.defaultTheme],
  )

  const apiConfigs = useMemo(
    () => activeWidget.configs?.filter((c) => c.section === "api") ?? [],
    [activeWidget],
  )

  const currentWidgetValues = useMemo(() => {
    const defaults: Record<string, ConfigValue> = {}
    activeWidget.configs?.forEach((c) => {
      if (c.defaultValue !== undefined) defaults[c.key] = c.defaultValue
    })
    return { ...defaults, ...(widgetConfigs[activeWidgetId] ?? {}) }
  }, [activeWidget, widgetConfigs, activeWidgetId])

  const combinedValues = useMemo((): Record<string, ConfigValue> => {
    const prefix = `theme.${themeScope}`
    const flattened = flattenTheme(activeTheme, prefix)
    const display = (activeTheme.display as Record<string, ConfigValue> | undefined)
    const topLevelDisplay = display ? { ...display } : {}
    return { ...currentWidgetValues, ...flattened, ...topLevelDisplay } as Record<string, ConfigValue>
  }, [currentWidgetValues, activeTheme, themeScope])

  const setWidgetConfig = (key: string, value: ConfigValue) => {
    setWidgetConfigs((prev) => ({
      ...prev,
      [activeWidgetId]: { ...(prev[activeWidgetId] ?? {}), [key]: value },
    }))
  }

  const setTheme = (path: string, value: unknown) => {
    setWidgetThemeConfigs((prev) => ({
      ...prev,
      [activeWidgetId]: setNestedValue(
        { ...(prev[activeWidgetId] ?? activeTheme) } as Record<string, unknown>,
        path,
        value,
      ) as Record<string, unknown>,
    }))
  }

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(themeMode)
    root.setAttribute("data-theme", themeMode)
  }, [themeMode])

  const codeSnippet = useMemo(() => {
    if (activeWidgetId === "customer-portal") {
      return `import { CustomerPortal } from '@metrifox/react-sdk';

<CustomerPortal 
  clientKey="${currentWidgetValues.clientKey ?? ""}"
  customerKey="${currentWidgetValues.customerKey ?? ""}"
  theme={${JSON.stringify(activeTheme, null, 2)}} 
/>`
    }
    if (activeWidgetId === "pricing-table") {
      const { display, ...themeForSdk } = activeTheme
      return `import { PricingTable } from '@metrifox/react-sdk';

<PricingTable 
  checkoutUsername="${currentWidgetValues.checkoutKey ?? ""}"
  productKey="${currentWidgetValues.productKey ?? ""}"
  plansOnly={${(display as Record<string, unknown>)?.plansOnly ?? false}}
  singlePurchasesOnly={${(display as Record<string, unknown>)?.singlePurchasesOnly ?? false}}
  showTabHeader={${(display as Record<string, unknown>)?.showTabHeader ?? true}}
  theme={{ pricingTable: ${JSON.stringify(themeForSdk, null, 2)} }} 
/>`
    }
    return `import { Widget } from '@metrifox/react-sdk';

// Replace with the appropriate component for ${activeWidget.name}
<Widget />`
  }, [activeWidgetId, activeWidget.name, activeTheme, currentWidgetValues])

  return (
    <div className={`pg-layout new-design pg-theme-${themeMode}`}>
      <aside className="pg-sidebar-left">
        <div className="pg-sidebar-header">
          <div className="pg-logo">
            <img src={metrifoxLogo} alt="Metrifox" className="pg-logo-img" />
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
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
            {activeWidget.description && (
              <p className="pg-widget-description">{activeWidget.description}</p>
            )}
          </div>
        </div>

        <div className="pg-sidebar-content">
          {apiConfigs.length > 0 && (
            <div className="pg-config-group">
              <h3 className="pg-group-title">API Configuration</h3>
              <div className="pg-group-content">
                <ConfigPanel
                  configs={apiConfigs}
                  values={currentWidgetValues}
                  onChange={setWidgetConfig}
                />
              </div>
            </div>
          )}

          <div className="pg-config-group">
            <h3 className="pg-group-title">Theme settings</h3>
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
              theme={activeTheme}
              onChange={setTheme}
              searchQuery={searchQuery}
              sectionDescriptions={activeWidget.sectionDescriptions}
            />
          </div>
        </div>
      </aside>

      <main className="pg-main-area">
        <header className="pg-topbar">
          <div className="pg-tabs">
            {(["preview", "json", "code"] as const).map((tab) => (
              <button
                key={tab}
                className={`pg-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "preview" ? "Live Preview" : tab === "json" ? "JSON Config" : "Code Snippet"}
                {tab === "code" && <span className="pg-badge">React</span>}
              </button>
            ))}
          </div>
          <div className="pg-toolbar">
            <a href={activeWidget.docsUrl ?? "https://docs.metrifox.com/sdks/frontend/react"} target="_blank" rel="noopener noreferrer" className="pg-header-link">Docs</a>
            <a href="https://github.com/metrifox/metrifox-sdk-demo" target="_blank" rel="noopener noreferrer" className="pg-header-link" title="View source on GitHub">
              <span className="pg-header-link-text">View Source</span>
              <svg className="pg-header-link-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
            <div className="pg-divider" />
            {(["desktop", "tablet", "mobile"] as const).map((mode) => (
              <button
                key={mode}
                className={`pg-icon-btn ${previewMode === mode ? "active" : ""}`}
                onClick={() => setPreviewMode(mode)}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
            <div className="pg-divider" />
            <button className="pg-icon-btn" onClick={() => setThemeMode((p) => (p === THEME.LIGHT ? THEME.DARK : THEME.LIGHT))}>
              {themeMode === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </header>

        <div className="pg-content">
          {activeTab === "preview" && (
            <Preview Component={activeWidget.component} configValues={combinedValues} mode={previewMode} />
          )}
          {activeTab === "json" && (
            <div className="pg-code-view">
              <pre>{JSON.stringify(activeTheme, null, 2)}</pre>
            </div>
          )}
          {activeTab === "code" && (
            <div className="pg-code-view">
              <pre>{codeSnippet}</pre>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
