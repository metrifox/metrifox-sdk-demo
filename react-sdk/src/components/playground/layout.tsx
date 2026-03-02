import { useState, useMemo, useEffect, useRef, useCallback } from "react"
import { ConfigPanel } from "./components/config-panel"
import { Preview } from "./components/preview"
import { ThemeConfigPanel } from "./components/theme-panel"
import { EditableCodeView } from "./components/editable-code-view"
import { TABS, PREVIEW_MODES } from "./constants"
import { SearchIcon } from "./playground-icons"
import { setNestedValue, flattenTheme } from "./utils/theme-utils"
import { buildCodeSnippet } from "./utils/code-snippet"
import type { WidgetDefinition, ConfigValue } from "../../types/widget"
import metrifoxLogo from "../../assets/metrifox-logo.png"
import "./styles/playground.css"
import { THEME } from "../../types/enums"

type LayoutProps = { widgets: WidgetDefinition[] }

export const PlaygroundLayout = ({ widgets }: LayoutProps) => {
  const [activeWidgetId, setActiveWidgetId] = useState(widgets[0].id)
  const [themeMode, setThemeMode] = useState<typeof THEME.LIGHT | typeof THEME.DARK>(() =>
    typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? THEME.DARK : THEME.LIGHT,
  )
  const [activeTab, setActiveTab] = useState<"preview" | "json" | "code">("preview")
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [searchQuery, setSearchQuery] = useState("")
  const [widgetConfigs, setWidgetConfigs] = useState<Record<string, Record<string, ConfigValue>>>({})
  const [widgetThemeConfigs, setWidgetThemeConfigs] = useState<Record<string, Record<string, unknown>>>({})
  const [jsonEditText, setJsonEditText] = useState("")
  const [codeEditText, setCodeEditText] = useState("")
  const [copied, setCopied] = useState<"json" | "code" | null>(null)
  const jsonDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeWidget = useMemo(
    () => widgets.find((w) => w.id === activeWidgetId) ?? widgets[0],
    [widgets, activeWidgetId],
  )

  const activeTheme = useMemo(
    () => (widgetThemeConfigs[activeWidgetId] ?? activeWidget.defaultTheme ?? {}) as Record<string, unknown>,
    [widgetThemeConfigs, activeWidgetId, activeWidget.defaultTheme],
  )

  const apiConfigs = useMemo(
    () => activeWidget.configs?.filter((c) => c.section === "api") ?? [],
    [activeWidget],
  )

  const currentWidgetValues = useMemo(() => {
    const defaults: Record<string, ConfigValue> = {}
    activeWidget.configs?.forEach((config) => {
      if (config.defaultValue !== undefined) defaults[config.key] = config.defaultValue
    })
    return { ...defaults, ...(widgetConfigs[activeWidgetId] ?? {}) }
  }, [activeWidget, widgetConfigs, activeWidgetId])

  const combinedValues = useMemo((): Record<string, ConfigValue> => {
    const prefix = `theme.${activeWidget.themeScope ?? "customerPortal"}`
    const flattened = flattenTheme(activeTheme, prefix)
    const display = activeTheme.display as Record<string, ConfigValue> | undefined
    return { ...currentWidgetValues, ...flattened, ...(display ?? {}) } as Record<string, ConfigValue>
  }, [currentWidgetValues, activeTheme, activeWidget.themeScope])

  const codeSnippet = useMemo(
    () => buildCodeSnippet(activeWidgetId, activeWidget, activeTheme, currentWidgetValues),
    [activeWidgetId, activeWidget, activeTheme, currentWidgetValues],
  )

  const setFullTheme = useCallback(
    (theme: Record<string, unknown>) => {
      setWidgetThemeConfigs((prev) => ({ ...prev, [activeWidgetId]: theme }))
    },
    [activeWidgetId],
  )

  const setWidgetConfig = useCallback(
    (key: string, value: ConfigValue) => {
      setWidgetConfigs((prev) => ({
        ...prev,
        [activeWidgetId]: { ...(prev[activeWidgetId] ?? {}), [key]: value },
      }))
    },
    [activeWidgetId],
  )

  const setTheme = useCallback(
    (path: string, value: unknown) => {
      setWidgetThemeConfigs((prev) => ({
        ...prev,
        [activeWidgetId]: setNestedValue(
          { ...(prev[activeWidgetId] ?? activeTheme) } as Record<string, unknown>,
          path,
          value,
        ) as Record<string, unknown>,
      }))
    },
    [activeWidgetId, activeTheme],
  )

  const handleCopy = useCallback(async (content: string, which: "json" | "code") => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(which)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // ignore
    }
  }, [])

  const handleJsonChange = useCallback(
    (value: string) => {
      setJsonEditText(value)
      if (jsonDebounceRef.current) clearTimeout(jsonDebounceRef.current)
      jsonDebounceRef.current = setTimeout(() => {
        try {
          const parsed = JSON.parse(value) as unknown
          if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
            setFullTheme(parsed as Record<string, unknown>)
          }
        } catch {
          // invalid JSON
        }
        jsonDebounceRef.current = null
      }, 500)
    },
    [setFullTheme],
  )

  useEffect(() => {
    if (activeTab === "json") {
      const next = JSON.stringify(activeTheme, null, 2)
      queueMicrotask(() => setJsonEditText(next))
    }
    if (activeTab === "code") {
      queueMicrotask(() => setCodeEditText(codeSnippet))
    }
  }, [activeTab, activeTheme, codeSnippet])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(themeMode)
    root.setAttribute("data-theme", themeMode)
  }, [themeMode])

  return (
    <div className={`pg-layout new-design pg-theme-${themeMode}`}>
      <aside className="pg-sidebar-left">
        <div className="pg-sidebar-header">
          <div className="pg-logo">
            <img src={metrifoxLogo} alt="Metrifox" className="pg-logo-img" />
          </div>
          <div className="pg-widget-select-wrap">
            <label htmlFor="pg-widget-select" className="pg-widget-select-label">Widget</label>
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
            {activeWidget.description && <p className="pg-widget-description">{activeWidget.description}</p>}
          </div>
        </div>

        <div className="pg-sidebar-content">
          {apiConfigs.length > 0 && (
            <div className="pg-config-group">
              <h3 className="pg-group-title">API Configuration</h3>
              <div className="pg-group-content">
                <ConfigPanel configs={apiConfigs} values={currentWidgetValues} onChange={setWidgetConfig} />
              </div>
            </div>
          )}

          <div className="pg-config-group">
            <h3 className="pg-group-title">Theme settings</h3>
            <div className="pg-theme-search-wrap">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search theme..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pg-theme-search-input"
                aria-label="Search theme"
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
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`pg-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {tab.badge && <span className="pg-badge">{tab.badge}</span>}
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
            {PREVIEW_MODES.map((mode) => (
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
            <EditableCodeView
              value={jsonEditText}
              onChange={handleJsonChange}
              onCopy={() => handleCopy(jsonEditText, "json")}
              isCopied={copied === "json"}
              copyLabel="Copy JSON"
              ariaLabel="JSON config"
            />
          )}
          {activeTab === "code" && (
            <EditableCodeView
              value={codeEditText}
              onChange={setCodeEditText}
              onCopy={() => handleCopy(codeEditText, "code")}
              isCopied={copied === "code"}
              copyLabel="Copy code"
              ariaLabel="Code snippet"
            />
          )}
        </div>
      </main>
    </div>
  )
}
