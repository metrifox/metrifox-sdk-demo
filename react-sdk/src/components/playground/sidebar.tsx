import type { THEME } from "../../types/enums"
import type { WidgetDefinition } from "../../types/widget"

type SidebarProps = {
  widgets: WidgetDefinition[]
  activeWidgetId: string
  onSelect: (id: string) => void
  theme: typeof THEME.LIGHT | typeof THEME.DARK
  onToggleTheme: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export const Sidebar = ({
  widgets,
  activeWidgetId,
  onSelect,
  theme,
  onToggleTheme,
  collapsed,
  onToggleCollapse,
}: SidebarProps) => {
  return (
    <aside className={`pg-sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Toggle Button - Floating */}
      <button
        className="pg-sidebar-toggle"
        onClick={onToggleCollapse}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? "»" : "«"}
      </button>

      <div className="pg-logo">
        <div className="pg-brand-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4V20"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M20 4V20"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M4 4L12 14L20 4"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="pg-brand-text">Metrifox</span>
            <span className="pg-badge">Playground</span>
          </div>
        )}
      </div>

      <nav className="pg-nav">
        <p className="pg-section-title">Widgets</p>
        <ul>
          {widgets.map((widget) => (
            <li key={widget.id}>
              <button
                className={`pg-nav-item ${widget.id === activeWidgetId ? "active" : ""}`}
                onClick={() => onSelect(widget.id)}
                title={collapsed ? widget.name : undefined}
              >
                <span className="pg-nav-icon">
                  {widget.icon ? widget.icon : widget.name.substring(0, 2).toUpperCase()}
                </span>
                <span className="pg-nav-text">
                  {widget.name}
                  {widget.status === "Beta" && (
                    <span className="pg-tag-beta" style={{ marginLeft: "8px" }}>
                      Beta
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="pg-sidebar-footer">
        <button
          className="pg-theme-toggle-btn"
          onClick={onToggleTheme}
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? "🌙" : "☀️"}
          <span>{theme === "light" ? " Dark Mode" : " Light Mode"}</span>
        </button>
      </div>
    </aside>
  )
}
