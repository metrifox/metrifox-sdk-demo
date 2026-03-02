export const setNestedValue = (
  obj: Record<string, unknown>,
  path: string,
  value: unknown,
): Record<string, unknown> => {
  if (path.includes(".")) {
    const [head, ...tail] = path.split(".")
    const current = (obj[head] as Record<string, unknown>) || {}
    return { ...obj, [head]: setNestedValue(current, tail.join("."), value) }
  }
  return { ...obj, [path]: value }
}

export const flattenTheme = (
  obj: Record<string, unknown>,
  prefix: string,
): Record<string, unknown> =>
  Object.keys(obj).reduce((acc: Record<string, unknown>, key: string) => {
    const value = obj[key]
    const newKey = prefix ? `${prefix}.${key}` : key
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenTheme(value as Record<string, unknown>, newKey))
    } else {
      acc[newKey] = value
    }
    return acc
  }, {})
