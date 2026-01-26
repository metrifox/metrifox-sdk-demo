import type { ReactNode } from "react"

type EmptyStateProps = {
  icon?: string | ReactNode
  title: string
  description: ReactNode
}

export const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <div
      className="pg-empty-state"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        color: "var(--pg-text-muted)",
        textAlign: "center",
        gap: "1rem",
        padding: "2rem",
      }}
    >
      <div style={{ fontSize: "3rem", opacity: 0.3 }}>{icon || "⚙️"}</div>
      <h3 style={{ margin: 0, fontWeight: 600, color: "var(--pg-text)" }}>{title}</h3>
      <p style={{ margin: 0, maxWidth: "300px" }}>{description}</p>
    </div>
  )
}
