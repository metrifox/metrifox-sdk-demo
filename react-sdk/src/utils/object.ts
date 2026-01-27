/**
 * Sets a value in a nested object using dot notation path
 * @param obj - The object to modify
 * @param path - Dot-notation path (e.g., "theme.card.background")
 * @param value - The value to set
 */
export const setNested = <T>(
  obj: Record<string, unknown>,
  path: string,
  value: T,
): void => {
  const keys = path.split(".")
  const lastKey = keys.pop()

  if (!lastKey) return

  const target = keys.reduce((acc, key) => {
    return (acc[key] ??= {}) as Record<string, unknown>
  }, obj)

  target[lastKey] = value
}

/**
 * Extracts theme configurations from a flat props object based on a scope.
 * @param props - The props object containing theme keys
 * @param scope - The scope to filter by
 */
export const extractThemeConfig = (
  props: Record<string, unknown>,
  scope: string,
): Record<string, unknown> => {
  const prefix = `theme.${scope}.`

  return Object.entries(props).reduce(
    (acc, [key, value]) => {
      if (key.startsWith(prefix)) {
        setNested(acc, key.replace("theme.", ""), value)
      }
      return acc
    },
    {} as Record<string, unknown>,
  )
}
