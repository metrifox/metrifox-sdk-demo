/**
 * Theme config entries for Customer Portal (matches React SDK demo structure).
 * Used to render the Theme section in the configuration panel.
 */
export interface ThemeConfigEntry {
  key: string;
  label: string;
  section: string;
  defaultValue: string;
}

export const CUSTOMER_PORTAL_THEME_CONFIG: ThemeConfigEntry[] = [
  { key: 'theme.customerPortal.linkColor', label: 'Link Color', section: 'Theme: General', defaultValue: '#2563eb' },
  { key: 'theme.customerPortal.tabs.background', label: 'Tab Background', section: 'Theme: Tabs', defaultValue: '#ffffff' },
  { key: 'theme.customerPortal.tabs.borderColor', label: 'Tab Border Color', section: 'Theme: Tabs', defaultValue: '#e5e7eb' },
  { key: 'theme.customerPortal.tabs.activeBackground', label: 'Active Tab Background', section: 'Theme: Tabs', defaultValue: '#eff6ff' },
  { key: 'theme.customerPortal.tabs.activeTextColor', label: 'Active Tab Text', section: 'Theme: Tabs', defaultValue: '#2563eb' },
  { key: 'theme.customerPortal.tabs.inactiveTextColor', label: 'Inactive Tab Text', section: 'Theme: Tabs', defaultValue: '#6b7280' },
  { key: 'theme.customerPortal.section.background', label: 'Section Background', section: 'Theme: Section', defaultValue: '#f1eaea' },
  { key: 'theme.customerPortal.section.titleTextColor', label: 'Section Title Color', section: 'Theme: Section', defaultValue: '#111827' },
  { key: 'theme.customerPortal.section.contentBackground', label: 'Section Content Background', section: 'Theme: Section', defaultValue: '#ffffff' },
  { key: 'theme.customerPortal.section.iconBackground', label: 'Section Icon Background', section: 'Theme: Section', defaultValue: '#f3f4f6' },
  { key: 'theme.customerPortal.section.iconColor', label: 'Section Icon Color', section: 'Theme: Section', defaultValue: '#4b5563' },
  { key: 'theme.customerPortal.section.emptyTextColor', label: 'Section Empty Text', section: 'Theme: Section', defaultValue: '#6b7280' },
  { key: 'theme.customerPortal.card.titleBackground', label: 'Card Title Background', section: 'Theme: Card', defaultValue: '#f9fafb' },
  { key: 'theme.customerPortal.card.contentBackground', label: 'Card Content Background', section: 'Theme: Card', defaultValue: '#ffffff' },
  { key: 'theme.customerPortal.card.titleColor', label: 'Card Title Color', section: 'Theme: Card', defaultValue: '#111827' },
  { key: 'theme.customerPortal.card.details.labelColor', label: 'Card Label Color', section: 'Theme: Card', defaultValue: '#6b7280' },
  { key: 'theme.customerPortal.card.details.valueColor', label: 'Card Value Color', section: 'Theme: Card', defaultValue: '#111827' },
  { key: 'theme.customerPortal.subscription.items.background', label: 'Subscription Item Background', section: 'Theme: Subscription', defaultValue: '#ffffff' },
  { key: 'theme.customerPortal.subscription.items.borderColor', label: 'Subscription Item Border Color', section: 'Theme: Subscription', defaultValue: '#e5e7eb' },
  { key: 'theme.customerPortal.subscription.items.textColor', label: 'Subscription Item Text', section: 'Theme: Subscription', defaultValue: '#111827' },
  { key: 'theme.customerPortal.table.headerTextColor', label: 'Table Header Text', section: 'Theme: Table', defaultValue: '#6b7280' },
  { key: 'theme.customerPortal.table.textColor', label: 'Table Text Color', section: 'Theme: Table', defaultValue: '#111827' },
  { key: 'theme.customerPortal.button.background', label: 'Button Background', section: 'Theme: Button', defaultValue: '#2563eb' },
  { key: 'theme.customerPortal.button.textColor', label: 'Button Text Color', section: 'Theme: Button', defaultValue: '#ffffff' },
  { key: 'theme.customerPortal.filter.border', label: 'Filter Border', section: 'Theme: Filter', defaultValue: '#e5e7eb' },
  { key: 'theme.customerPortal.filter.activeBackground', label: 'Filter Active Background', section: 'Theme: Filter', defaultValue: '#eff6ff' },
  { key: 'theme.customerPortal.filter.inactiveBackground', label: 'Filter Inactive Background', section: 'Theme: Filter', defaultValue: '#ffffff' },
  { key: 'theme.customerPortal.filter.activeTextColor', label: 'Filter Active Text', section: 'Theme: Filter', defaultValue: '#2563eb' },
  { key: 'theme.customerPortal.filter.inactiveTextColor', label: 'Filter Inactive Text', section: 'Theme: Filter', defaultValue: '#6b7280' },
  { key: 'theme.customerPortal.filter.countBackground', label: 'Filter Count Background', section: 'Theme: Filter', defaultValue: '#dbeafe' },
  { key: 'theme.customerPortal.filter.countTextColor', label: 'Filter Count Text', section: 'Theme: Filter', defaultValue: '#1e40af' },
];

const PREFIX = 'theme.customerPortal.';

/**
 * Build nested Customer Portal theme object from flat config keys.
 * Mirrors React SDK demo's extractThemeConfig(scope: 'customerPortal').
 */
export function getThemeFromConfig(config: Record<string, string>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const entry of CUSTOMER_PORTAL_THEME_CONFIG) {
    const value = config[entry.key] ?? entry.defaultValue;
    if (!value) continue;
    setNested(result, entry.key.replace(PREFIX, ''), value);
  }
  return result;
}

function setNested(obj: Record<string, unknown>, path: string, value: string): void {
  const keys = path.split('.');
  const lastKey = keys.pop();
  if (!lastKey) return;
  let target: Record<string, unknown> = obj;
  for (const key of keys) {
    const next = (target[key] ?? {}) as Record<string, unknown>;
    target[key] = next;
    target = next;
  }
  target[lastKey] = value;
}

/** Unique section names for grouping theme controls */
export function getThemeSections(): string[] {
  const set = new Set(CUSTOMER_PORTAL_THEME_CONFIG.map((c) => c.section));
  return Array.from(set);
}
