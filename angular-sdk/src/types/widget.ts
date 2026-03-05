export type ConfigValue = string | number | boolean;

export type WidgetConfigParam = {
  key: string;
  label: string;
  type: 'text' | 'color' | 'boolean' | 'select';
  defaultValue?: ConfigValue;
  placeholder?: string;
  options?: { label: string; value: ConfigValue }[];
  section?: string;
};

export type WidgetDefinition = {
  id: string;
  name: string;
  description: string;
  status: 'Live' | 'Beta' | 'Roadmap';
  docsUrl: string;
  highlights: string[];
  configs?: WidgetConfigParam[];
  defaultTheme?: Record<string, unknown>;
  themeScope?: string;
  sectionDescriptions?: Record<string, string>;
  iconSvg?: string;
};
