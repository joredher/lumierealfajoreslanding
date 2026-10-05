import { useEffect, useRef } from 'react'
import { clearOrderTs, isExpired, readTs, touchOrder } from './orderStore'

// Invisible inactivity timer for the order in progress.
// - Every change to the draft box or the cart restarts the 15-minute window.
// - If the window runs out with products still selected (nothing sent), onExpire() wipes the order.
// - Checked on an interval and when the tab regains focus (browsers throttle timers in background tabs).
export function useOrderExpiry(draft, boxes, onExpire) {
  const hasItems = Object.keys(draft).length > 0 || boxes.length > 0
  const prev = useRef({ draft, boxes })
  const latest = useRef({ hasItems, onExpire })

  useEffect(() => {
    latest.current = { hasItems, onExpire }
  })

  useEffect(() => {
    if (prev.current.draft === draft && prev.current.boxes === boxes) return
    prev.current = { draft, boxes }
    if (hasItems) touchOrder()
    else clearOrderTs()
  }, [draft, boxes, hasItems])

  useEffect(() => {
    const check = () => {
      if (latest.current.hasItems && isExpired(readTs())) latest.current.onExpire()
    }
    const id = setInterval(check, 15_000)
    document.addEventListener('visibilitychange', check)
    window.addEventListener('focus', check)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', check)
      window.removeEventListener('focus', check)
    }
  }, [])
}
