import { CustomerPortal, metrifoxInit } from "@metrifox/react-sdk"
import "@metrifox/react-sdk/dist/styles.css"
import { useEffect } from "react"
import { EmptyState } from "../../components/playground/empty-state"
import { extractThemeConfig } from "../../utils/object"
import type { ConfigValue } from "../../types/widget"

type CustomerPortalWidgetProps = {
  customerKey?: string
  clientKey?: string
  [key: string]: ConfigValue | undefined
}

export const CustomerPortalWidget = ({
  customerKey,
  clientKey,
  ...rest
}: CustomerPortalWidgetProps) => {
  // Initialize SDK when clientKey or theme changes
  useEffect(() => {
    if (clientKey) {
      const themeObj = extractThemeConfig(rest, "customerPortal")

      metrifoxInit({
        clientKey,
        theme: Object.keys(themeObj).length > 0 ? themeObj : undefined,
      })
    }
  }, [clientKey, rest])

  if (!clientKey || !customerKey) {
    return (
      <EmptyState
        title="Configuration Required"
        description={
          <>
            Please enter your <strong>Client Key</strong> and{" "}
            <strong>Customer Key</strong> in the configuration panel to render the portal.
          </>
        }
      />
    )
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <CustomerPortal customerKey={customerKey} />
    </div>
  )
}
