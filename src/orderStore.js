// Storage + expiry rules for the order in progress.
// The customer never sees a countdown: if they pick products and don't send the order
// within EXPIRY_MS of their last change, the selection is wiped (see App.jsx).
export const EXPIRY_MS = 15 * 60 * 1000
export const CART_KEY = 'lumiere-cart-v2'
const TS_KEY = 'lumiere-order-ts'

const safe = (fn, fallback) => {
  try {
    return fn()
  } catch {
    return fallback // storage blocked (private mode, etc.)
  }
}

export const readTs = () => safe(() => Number(localStorage.getItem(TS_KEY)) || 0, 0)
export const touchOrder = () => safe(() => localStorage.setItem(TS_KEY, String(Date.now())))
export const clearOrderTs = () => safe(() => localStorage.removeItem(TS_KEY))
export const isExpired = (ts) => ts > 0 && Date.now() - ts >= EXPIRY_MS

let initial
// Reads the saved cart once per page load. If it was left untouched for 15+ minutes
// (e.g. the customer closed the site and came back later) it is deleted and flagged as expired.
export function getInitialOrder() {
  if (initial) return initial
  let boxes = safe(() => JSON.parse(localStorage.getItem(CART_KEY)), [])
  if (!Array.isArray(boxes)) boxes = []
  let expired = false
  if (boxes.length) {
    const ts = readTs()
    if (!ts || isExpired(ts)) {
      expired = ts > 0 // no timestamp = leftover from an older version: reset silently
      boxes = []
      safe(() => localStorage.removeItem(CART_KEY))
      clearOrderTs()
    }
  }
  initial = { boxes, expired }
  return initial
}

// Test hook: forget the cached page-load snapshot so the next getInitialOrder() re-reads storage.
export const resetInitialOrder = () => {
  initial = undefined
}
