import type { WidgetDefinition, ConfigValue } from "../../../types/widget"

export const buildCodeSnippet = (
  activeWidgetId: string,
  activeWidget: WidgetDefinition,
  activeTheme: Record<string, unknown>,
  currentWidgetValues: Record<string, ConfigValue>,
): string => {
  if (activeWidgetId === "customer-portal") {
    return `import { CustomerPortal } from '@metrifox/react-sdk';

<CustomerPortal 
  clientKey="${currentWidgetValues.clientKey ?? ""}"
  customerKey="${currentWidgetValues.customerKey ?? ""}"
  theme={${JSON.stringify(activeTheme, null, 2)}} 
/>`
  }
  if (activeWidgetId === "pricing-table") {
    const { display, ...themeForSdk } = activeTheme
    const d = display as Record<string, unknown> | undefined
    return `import { PricingTable } from '@metrifox/react-sdk';

<PricingTable 
  checkoutUsername="${currentWidgetValues.checkoutKey ?? ""}"
  productKey="${currentWidgetValues.productKey ?? ""}"
  plansOnly={${d?.plansOnly ?? false}}
  singlePurchasesOnly={${d?.singlePurchasesOnly ?? false}}
  showTabHeader={${d?.showTabHeader ?? true}}
  theme={{ pricingTable: ${JSON.stringify(themeForSdk, null, 2)} }} 
/>`
  }
  return `import { Widget } from '@metrifox/react-sdk';

// Replace with the appropriate component for ${activeWidget.name}
<Widget />`
}
