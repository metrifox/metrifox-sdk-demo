/**
 * Sets a value in a nested object using dot notation path
 * @param obj - The object to modify
 * @param path - Dot-notation path (e.g., "theme.card.background")
 * @param value - The value to set
 * @example
 * const obj = {}
 * setNested(obj, "theme.card.background", "#ffffff")
 * // Result: { theme: { card: { background: "#ffffff" } } }
 */
export const setNested = <T = unknown>(
  obj: Record<string, unknown>,
  path: string,
  value: T,
): void => {
  const keys = path.split(".")
  let current: Record<string, unknown> = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!current[key] || typeof current[key] !== "object") {
      current[key] = {}
    }
    current = current[key] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
}
