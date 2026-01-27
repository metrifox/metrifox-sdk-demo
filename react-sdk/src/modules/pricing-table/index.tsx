import { PricingTable, metrifoxInit } from "@metrifox/react-sdk"
import { useEffect } from "react"
import { EmptyState } from "../../components/playground/empty-state"
import { extractThemeConfig } from "../../utils/object"
import type { ConfigValue } from "../../types/widget"

type PricingTableWidgetProps = {
  clientKey?: string
  checkoutKey?: string
  productKey?: string
  plansOnly?: boolean
  singlePurchasesOnly?: boolean
  showTabHeader?: boolean
  [key: string]: ConfigValue | undefined
}

export const PricingTableWidget = ({
  checkoutKey,
  productKey,
  plansOnly,
  singlePurchasesOnly,
  showTabHeader,
  clientKey,
  ...rest
}: PricingTableWidgetProps) => {
  // Initialize SDK with themeAnd client key
  useEffect(() => {
    const themeObj = extractThemeConfig(rest, "pricingTable")

    if (clientKey) {
      metrifoxInit({
        clientKey,
        theme: Object.keys(themeObj).length > 0 ? themeObj : undefined,
      })
    }
  }, [clientKey, rest])

  if (!clientKey || !checkoutKey || !productKey) {
    return (
      <EmptyState
        title="Configuration Required"
        description={
          <>
            Please enter your <strong>Checkout Username</strong> and{" "}
            <strong>Product Key</strong> to view the pricing table.
          </>
        }
      />
    )
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <PricingTable
        checkoutUsername={checkoutKey}
        productKey={productKey}
        plansOnly={plansOnly}
        singlePurchasesOnly={singlePurchasesOnly}
        showTabHeader={showTabHeader}
      />
    </div>
  )
}
