import { BOX_SIZE, FLAVORS, MAX_LOOSE, MIN_LOOSE, SIZES } from './data/site'

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

// localStorage is user-editable: only accept cart items that look exactly like ones the UI can create.
export function isValidItem(item) {
  if (!item || typeof item !== 'object' || typeof item.uid !== 'string') return false
  if (!SIZES.some((s) => s.id === item.size)) return false
  if (item.kind !== undefined && item.kind !== 'box' && item.kind !== 'loose') return false
  const { flavors } = item
  if (!flavors || typeof flavors !== 'object' || Array.isArray(flavors)) return false
  const entries = Object.entries(flavors)
  if (!entries.length) return false
  let units = 0
  for (const [id, q] of entries) {
    if (!FLAVORS.some((f) => f.id === id) || !Number.isInteger(q) || q < 1 || q > MAX_LOOSE) return false
    units += q
  }
  return item.kind === 'loose' ? units >= MIN_LOOSE && units <= MAX_LOOSE : units === BOX_SIZE
}

let initial
// Reads the saved cart once per page load. If it was left untouched for 15+ minutes
// (e.g. the customer closed the site and came back later) it is deleted and flagged as expired.
export function getInitialOrder() {
  if (initial) return initial
  let boxes = safe(() => JSON.parse(localStorage.getItem(CART_KEY)), [])
  boxes = Array.isArray(boxes) ? boxes.filter(isValidItem) : []
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
