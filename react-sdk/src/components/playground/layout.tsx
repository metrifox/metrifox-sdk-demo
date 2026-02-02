import { useState, useMemo, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { ConfigPanel } from "./config-panel"
import { Preview } from "./preview"
import type { WidgetDefinition, ConfigValue } from "../../types/widget"
import "./playground.css"
import { THEME } from "../../types/enums"

type LayoutProps = {
  widgets: WidgetDefinition[]
}

export const PlaygroundLayout = ({ widgets }: LayoutProps) => {
  const [activeWidgetId, setActiveWidgetId] = useState(widgets[0].id)
  const [theme, setTheme] = useState<typeof THEME.LIGHT | typeof THEME.DARK>(THEME.LIGHT)
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [isConfigCollapsed, setConfigCollapsed] = useState(false)

  // Store config values for each widget separately so they persist when switching
  const [configs, setConfigs] = useState<Record<string, Record<string, ConfigValue>>>({})

  const activeWidget = useMemo(
    () => widgets.find((widget) => widget.id === activeWidgetId) || widgets[0],
    [widgets, activeWidgetId],
  )

  const currentValues = useMemo(() => {
    const defaults: Record<string, ConfigValue> = {}
    activeWidget.configs?.forEach((config) => {
      if (config.defaultValue !== undefined) {
        defaults[config.key] = config.defaultValue
      }
    })

    return { ...defaults, ...(configs[activeWidgetId] || {}) }
  }, [activeWidget, configs, activeWidgetId])

  const handleConfigChange = (key: string, value: ConfigValue) => {
    setConfigs((prev) => ({
      ...prev,
      [activeWidgetId]: {
        ...(prev[activeWidgetId] || {}),
        [key]: value,
      },
    }))
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT))
  }

  // Apply theme to html element
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    root.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <div className="pg-layout">
      {/* Sidebar */}
      <Sidebar
        widgets={widgets}
        activeWidgetId={activeWidgetId}
        onSelect={(id) => {
          setActiveWidgetId(id)
          setMobileMenuOpen(false)
        }}
        collapsed={isSidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <main className="pg-main">
        <header className="pg-header">
          <div className="flex items-center gap-3">
            <button
              className="pg-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h2>{activeWidget.name}</h2>
          </div>
          <div className="flex items-center gap-3">
            {activeWidget.docsUrl && (
              <a
                href={activeWidget.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pg-link-btn"
              >
                Docs ↗
              </a>
            )}
            <div className="pg-header-divider" />

            <a
              href="https://github.com/metrifox/metrifox-sdk-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="pg-icon-link"
              style={{ gap: "8px", paddingLeft: "12px", paddingRight: "12px" }}
              title="View on GitHub"
            >
              <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>View Source</span>
              <svg
                height="20"
                width="20"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>

            <button
              className="pg-theme-toggle-header"
              onClick={toggleTheme}
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </header>

        <Preview Component={activeWidget.component} configValues={currentValues} />
      </main>

      {/* Config Panel */}
      <aside className={`pg-config-sidebar ${isConfigCollapsed ? "collapsed" : ""}`}>
        <button
          className="pg-config-toggle"
          onClick={() => setConfigCollapsed(!isConfigCollapsed)}
          aria-label={
            isConfigCollapsed ? "Expand configuration" : "Collapse configuration"
          }
        >
          »
        </button>
        <ConfigPanel
          configs={activeWidget.configs}
          values={currentValues}
          onChange={handleConfigChange}
          collapsed={isConfigCollapsed}
        />
      </aside>
    </div>
  )
}
