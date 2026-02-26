import { useState, type ChangeEvent, useEffect } from "react"
import "./theme-panel.css"

type ThemeConfigPanelProps = {
  theme: Record<string, unknown>
  onChange: (path: string, value: unknown) => void
  searchQuery?: string
  /** Optional short description per theme section (e.g. general, tabs, sections) */
  sectionDescriptions?: Record<string, string>
}

const formatLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
}

const ColorInput = ({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div className="tp-color-input">
      <div className="tp-color-swatch-wrapper">
        <input
          type="color"
          value={localValue}
          onChange={handleChange}
          className="tp-color-swatch"
        />
        <div
          className="tp-color-preview"
          style={{ backgroundColor: localValue }}
        />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        className="tp-text-input tp-color-text"
      />
    </div>
  )
}

const SliderInput = ({
  value,
  onChange,
  unit = "px",
}: {
  value: string
  onChange: (val: string) => void
  unit?: string
}) => {
  const numericValue = parseInt(value.replace(unit, ""), 10) || 0

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(`${e.target.value}${unit}`)
  }

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="tp-slider-input">
      <input
        type="range"
        min="0"
        max="32"
        value={numericValue}
        onChange={handleSliderChange}
        className="tp-range"
      />
      <input
        type="text"
        value={value}
        onChange={handleTextChange}
        className="tp-text-input tp-slider-text"
      />
    </div>
  )
}

const ConfigItem = ({
  label,
  value,
  onChange,
  itemKey,
}: {
  label: string
  value: unknown
  onChange: (val: unknown) => void
  itemKey: string
}) => {
  const strValue = typeof value === "string" ? value : String(value ?? "")
  const isBoolean = typeof value === "boolean"
  const isColor =
    (typeof value === "string" && value.startsWith("#")) ||
    (typeof value === "string" && value.startsWith("rgb")) ||
    label.toLowerCase().includes("color") ||
    label.toLowerCase().includes("background")

  const isBorderRadius = itemKey.toLowerCase().includes("radius")
  const isSpacing = itemKey.toLowerCase().includes("padding") || itemKey.toLowerCase().includes("gap")

  return (
    <div className="tp-config-item">
      <label className="tp-label">{label}</label>
      {isBoolean ? (
        <label className="tp-toggle">
          <input
            type="checkbox"
            checked={value === true}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span>{value === true ? "On" : "Off"}</span>
        </label>
      ) : isColor ? (
        <ColorInput value={strValue} onChange={(val) => onChange(val)} />
      ) : isBorderRadius || isSpacing ? (
        <SliderInput value={strValue} onChange={(val) => onChange(val)} />
      ) : (
        <input
          type="text"
          value={strValue}
          onChange={(e) => onChange(e.target.value)}
          className="tp-text-input"
        />
      )}
    </div>
  )
}

const CollapsibleRootSection = ({
  title,
  description,
  children,
  searchQuery,
}: {
  title: string
  description?: string
  children: React.ReactNode
  searchQuery: string
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const effectiveOpen = searchQuery.trim() ? true : isOpen

  return (
    <div className="tp-root-section">
      <button className="tp-root-header" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="tp-root-title">{title}</h3>
        <span className={`tp-chevron ${effectiveOpen ? "open" : ""}`}>›</span>
      </button>
      {description && <p className="tp-root-description">{description}</p>}
      {effectiveOpen && <div className="tp-root-content">{children}</div>}
    </div>
  )
}

/** One expand/collapse state per section so toggling one does not affect others */
const CollapsibleSection = ({
  label,
  level,
  children,
}: {
  label: string
  level: number
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="tp-section">
      <button
        type="button"
        className="tp-section-header"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ paddingLeft: level > 0 ? 8 : 0 }}
      >
        <span className="tp-section-title">{label}</span>
        <span className={`tp-chevron ${isOpen ? "open" : ""}`}>›</span>
      </button>
      {isOpen && <div className="tp-section-content">{children}</div>}
    </div>
  )
}

/** Renders theme data tree. Search is not used here – only root group names are filtered in ThemeConfigPanel. */
const RecursiveGroup = ({
  data,
  path,
  onChange,
  level = 0,
}: {
  data: Record<string, unknown>
  path: string
  onChange: (path: string, val: unknown) => void
  level?: number
}) => {
  if (typeof data !== "object" || data === null) {
    return null
  }

  const entries = Object.entries(data)

  return (
    <div className={`tp-group level-${level}`}>
      {entries.map(([key, value]) => {
        const currentPath = path ? `${path}.${key}` : key
        const isObject =
          typeof value === "object" && value !== null && !Array.isArray(value)
        const label = formatLabel(key)

        if (isObject) {
          return (
            <CollapsibleSection key={key} label={label} level={level}>
              <RecursiveGroup
                data={value as Record<string, unknown>}
                path={currentPath}
                onChange={onChange}
                level={level + 1}
              />
            </CollapsibleSection>
          )
        }

        return (
          <ConfigItem
            key={key}
            itemKey={key}
            label={label}
            value={value}
            onChange={(val) => onChange(currentPath, val)}
          />
        )
      })}
    </div>
  )
}

export const ThemeConfigPanel = ({
  theme,
  onChange,
  searchQuery = "",
  sectionDescriptions,
}: ThemeConfigPanelProps) => {
  const sections = Object.keys(theme)
  const q = searchQuery.trim().toLowerCase()

  // Filter only by root group name (e.g. general, sections, plans). Expanded content is never filtered.
  const visibleSections = q
    ? sections.filter((sectionKey) => sectionKey.toLowerCase().includes(q))
    : sections

  return (
    <div className="tp-panel">
      {visibleSections.map((sectionKey) => (
        <CollapsibleRootSection
          key={sectionKey}
          title={formatLabel(sectionKey)}
          description={sectionDescriptions?.[sectionKey]}
          searchQuery={searchQuery}
        >
          <RecursiveGroup
            data={(theme[sectionKey] ?? {}) as Record<string, unknown>}
            path={sectionKey}
            onChange={onChange}
            level={0}
          />
        </CollapsibleRootSection>
      ))}
    </div>
  )
}
