import { CopyIcon } from "./playground-icons"

export type EditableCodeViewProps = {
  value: string
  onChange: (value: string) => void
  onCopy: () => void
  isCopied: boolean
  copyLabel: string
  ariaLabel: string
}

export const EditableCodeView = ({ value, onChange, onCopy, isCopied, copyLabel, ariaLabel }: EditableCodeViewProps) => (
  <div className="pg-code-view-wrap">
    <div className="pg-code-view-header">
      <button type="button" className="pg-copy-btn" onClick={onCopy} title={copyLabel} aria-label={copyLabel}>
        <CopyIcon />
        <span>{isCopied ? "Copied!" : "Copy"}</span>
      </button>
    </div>
    <div className="pg-code-view">
      <textarea
        className="pg-code-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        aria-label={ariaLabel}
      />
    </div>
  </div>
)
