import { useState } from "react"
import "./App.css"
import { widgetCatalog } from "./utils/widget"




const App = () => {
  const [activeWidgetId, setActiveWidgetId] = useState(widgetCatalog[0].id)
  const activeWidget =
    widgetCatalog.find((widget) => widget.id === activeWidgetId) ?? widgetCatalog[0]
  const ActiveWidget = activeWidget.component


  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <p className="eyebrow">Metrifox SDK Playground</p>
          <h1>Design once. Embed across every revenue surface.</h1>
          <p className="lead">
            Explore production-ready widgets. Switch
            widgets to see how the SDK adapts, then jump directly into the docs.
          </p>

          <div className="header-actions">
            <a
              className="primary-btn"
              href="https://docs.metrifox.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse documentation
            </a>
            <a
              className="ghost-btn"
              href="https://metrifox.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit website
            </a>
          </div>
        </div>
      </header>

      <main className="canvas">
        <section className="widget-library">
          <div className="library-heading">
            <p className="eyebrow">Widget library</p>
            <p className="muted">
              Pick the widget you want to inspect.
            </p>
          </div>

          <div className="widget-list">
            {widgetCatalog.map((widget) => (
              <button
                key={widget.id}
                type="button"
                className={`widget-pill${widget.id === activeWidgetId ? " active" : ""}`}
                onClick={() => setActiveWidgetId(widget.id)}
              >
                <div>
                  <p className="eyebrow">{widget.status}</p>
                  <h3>{widget.name}</h3>
                  <p className="muted">{widget.description}</p>
                  <span className="chip chip-outline">View</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="widget-stage">
          <div className="stage-header">
            <div>
              <p className="eyebrow">Currently previewing</p>
              <h2>{activeWidget.name}</h2>
            </div>
            <div className="stage-actions">
              <a href={activeWidget.docsUrl} target="_blank" rel="noopener noreferrer">
                Open docs
              </a>
            </div>
          </div>


          <div className="widget-preview">
            <ActiveWidget />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
