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
  const [theme, setTheme] = useState<typeof THEME.LIGHT | typeof THEME.DARK>(THEME.DARK)
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)

  const [isConfigCollapsed, setConfigCollapsed] = useState(false)

  // Store config values for each widget separately so they persist when switching
  const [configs, setConfigs] = useState<Record<string, Record<string, ConfigValue>>>({})

  const activeWidget = useMemo(
    () => widgets.find((w) => w.id === activeWidgetId) || widgets[0],
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
        onSelect={setActiveWidgetId}
        theme={theme}
        onToggleTheme={toggleTheme}
        collapsed={isSidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <main className="pg-main">
        <header className="pg-header">
          <h2>{activeWidget.name}</h2>
          <div className="flex gap-4">
            {activeWidget.docsUrl && (
              <a
                href={activeWidget.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pg-link-btn"
              >
                Documentation ↗
              </a>
            )}
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
