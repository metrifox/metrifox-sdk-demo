import type { ComponentType, ReactNode } from "react"

export type ConfigValue = string | number | boolean

export type WidgetConfigParam = {
  key: string
  label: string
  type: "text" | "color" | "boolean" | "select"
  defaultValue?: ConfigValue
  placeholder?: string
  options?: { label: string; value: ConfigValue }[]
  section?: string
}

export type WidgetDefinition = {
  id: string
  name: string
  description: string
  status: "Live" | "Beta" | "Roadmap"
  docsUrl: string
  highlights: string[]
  component: ComponentType<Record<string, ConfigValue>>
  configs?: WidgetConfigParam[]
  /** Default nested theme for this widget. Each widget has its own theme state; this is the initial value. */
  defaultTheme?: Record<string, unknown>
  /** Theme scope key for the SDK (e.g. "customerPortal", "pricingTable"). Used when building combinedValues and code snippet. */
  themeScope?: string
  /** Optional short description per theme section (nested keys, e.g. "card", "button"). */
  sectionDescriptions?: Record<string, string>
  icon?: ReactNode
}
