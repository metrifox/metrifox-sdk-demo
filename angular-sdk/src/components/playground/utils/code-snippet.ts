import type { WidgetDefinition, ConfigValue } from '../../../types/widget';

export const buildCodeSnippet = (
  activeWidgetId: string,
  _activeWidget: WidgetDefinition,
  activeTheme: Record<string, unknown>,
  currentWidgetValues: Record<string, ConfigValue>,
): string => {
  if (activeWidgetId === 'customer-portal') {
    return `import { MetrifoxService, CustomerPortalComponent } from '@metrifox/angular-sdk';

// In your module/component providers:
providers: [...provideMetrifox()]

// Initialize the SDK:
MetrifoxService.initialize({
  clientKey: '${currentWidgetValues['clientKey'] ?? ''}',
  theme: ${JSON.stringify(activeTheme, null, 2)},
});

// In your template:
<metrifox-customer-portal
  [customerKey]="'${currentWidgetValues['customerKey'] ?? ''}'"
/>`;
  }
  if (activeWidgetId === 'pricing-table') {
    const { display, ...themeForSdk } = activeTheme;
    const d = display as Record<string, unknown> | undefined;
    return `import { MetrifoxService, PricingTableComponent } from '@metrifox/angular-sdk';

// In your module/component providers:
providers: [...provideMetrifox()]

// Initialize the SDK:
MetrifoxService.initialize({
  clientKey: '${currentWidgetValues['clientKey'] ?? ''}',
  theme: ${JSON.stringify(themeForSdk, null, 2)},
});

// In your template:
<metrifox-pricing-table
  [checkoutUsername]="'${currentWidgetValues['checkoutKey'] ?? ''}'"
  [productKey]="'${currentWidgetValues['productKey'] ?? ''}'"
  [plansOnly]="${d?.['plansOnly'] ?? false}"
  [singlePurchasesOnly]="${d?.['singlePurchasesOnly'] ?? false}"
  [showTabHeader]="${d?.['showTabHeader'] ?? true}"
/>`;
  }
  return `// Replace with the appropriate component for ${_activeWidget.name}`;
};
