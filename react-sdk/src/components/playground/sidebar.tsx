import type { WidgetDefinition } from "../../types/widget"
import logo from "../../../assets/logo.png"
import icon from "../../../assets/icon.png"

type SidebarProps = {
  widgets: WidgetDefinition[]
  activeWidgetId: string
  onSelect: (id: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
  isMobileOpen: boolean
  onCloseMobile: () => void
}

export const Sidebar = ({
  widgets,
  activeWidgetId,
  onSelect,
  collapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) => {
  return (
    <>
      <div
        className={`pg-sidebar-overlay ${isMobileOpen ? "open" : ""}`}
        onClick={onCloseMobile}
      />

      <aside
        className={`pg-sidebar ${collapsed ? "collapsed" : ""} ${isMobileOpen ? "mobile-open" : ""}`}
      >
        <button
          className="pg-sidebar-toggle"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "»" : "«"}
        </button>

        <button
          className="pg-sidebar-mobile-close"
          onClick={onCloseMobile}
          aria-label="Close sidebar"
        >
          ×
        </button>

        <div className="pg-logo">
          <div className="pg-brand-image">
            {collapsed && !isMobileOpen ? (
              <img src={icon} alt="Metrifox" style={{ height: "32px", width: "auto" }} />
            ) : (
              <img src={logo} alt="Metrifox" style={{ height: "28px", width: "auto" }} />
            )}
          </div>
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
                    {widget.icon
                      ? widget.icon
                      : widget.name.substring(0, 2).toUpperCase()}
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
      </aside>
    </>
  )
}
