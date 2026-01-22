import type { ComponentType } from "react"

export type WidgetDefinition = {
  id: string
  name: string
  description: string
  status: "Live" | "Beta" | "Roadmap"
  docsUrl: string
  highlights: string[]
  component: ComponentType
}