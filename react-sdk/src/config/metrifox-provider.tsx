import { metrifoxInit } from "@metrifox/react-sdk"
import { useEffect } from "react"

export const MetrifoxSDKProvider = () => {
  const initializeMetrifox = () => {
    metrifoxInit({
      clientKey: "tPVJP9Sw87rO4OWMpDtXDRzjDH1iw4bh_uShZqh1xUU",
    })
  }

  useEffect(() => {
    initializeMetrifox()
  }, [])

  return null
}
