import { CustomerPortalWidget } from "../modules/customer-portal";
import type { WidgetDefinition } from "../types/widget";

export const widgetCatalog: WidgetDefinition[] = [
  {
    id: "customer-portal",
    name: "Customer Portal",
    description: "Self-serve portal for invoices, payment methods, and secure support.",
    status: "Live",
    docsUrl: "https://docs.metrifox.com/sdks/frontend/react#core-widget:-customerportal",
    highlights: [""],
    component: CustomerPortalWidget,
  },
  // {
  //   id: "pricing-table",
  //   name: "Pricing Table",
  //   description:
  //     "Composable pricing surfaces that update in real time across touchpoints.",
  //   status: "Beta",
  //   docsUrl: "",
  //   highlights: [""],
  //   component: <PricingTableWidget />,
  // },
] 