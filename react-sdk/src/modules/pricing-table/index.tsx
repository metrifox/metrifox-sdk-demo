import { PricingTable, metrifoxInit } from "@metrifox/react-sdk"
import { useEffect } from "react"
import { EmptyState } from "../../components/playground/empty-state"
import { setNested } from "../../utils/object"
import type { ConfigValue } from "../../types/widget"

type PricingTableWidgetProps = {
  checkoutKey?: string
  productKey?: string
  [key: string]: ConfigValue | undefined
}

export const PricingTableWidget = ({
  checkoutKey,
  productKey,
  ...rest
}: PricingTableWidgetProps) => {
  // Re-initialize Metrifox when theme props or client key changes
  useEffect(() => {
    const themeObj: Record<string, unknown> = {}

    // Process theme props
    Object.keys(rest).forEach((key) => {
      if (key.startsWith("theme.")) {
        const path = key.replace("theme.", "")
        setNested(themeObj, path, rest[key])
      }
    })

    // Initialize SDK with theme
    // We use a default client key for demo purposes
    metrifoxInit({
      clientKey: "tPVJP9Sw87rO4OWMpDtXDRzjDH1iw4bh_uShZqh1xUU",
      pricingTableTheme: Object.keys(themeObj).length > 0 ? themeObj : undefined,
    })
  }, [rest])

  if (!checkoutKey || !productKey) {
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
      <PricingTable checkoutUsername={checkoutKey} productKey={productKey} />
    </div>
  )
}
