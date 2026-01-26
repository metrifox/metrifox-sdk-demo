import { CustomerPortal, metrifoxInit } from "@metrifox/react-sdk"
import "@metrifox/react-sdk/dist/styles.css"
import { useEffect } from "react"
import { EmptyState } from "../../components/playground/empty-state"

export const CustomerPortalWidget = ({
  customerKey,
  clientKey,
}: {
  customerKey?: string
  clientKey?: string
}) => {
  // Initialize SDK when clientKey changes
  useEffect(() => {
    if (clientKey) {
      metrifoxInit({
        clientKey,
      })
    }
  }, [clientKey])

  if (!customerKey || !clientKey) {
    return (
      <EmptyState
        title="Configuration Required"
        description={
          <>
            Please enter your <strong>Customer Key</strong> and{" "}
            <strong>Client Key</strong> in the configuration panel to render the portal.
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
