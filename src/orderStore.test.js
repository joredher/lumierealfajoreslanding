import { beforeEach, describe, expect, it, vi } from 'vitest'

const MIN = 60 * 1000
const BOX = [{ uid: 'a', size: 'mini', flavors: { mora: 4 } }]

// getInitialOrder() caches per page load, so load a fresh module for each case
const freshStore = async () => {
  vi.resetModules()
  return import('./orderStore.js')
}

describe('order expiry (15 minutes)', () => {
  beforeEach(() => localStorage.clear())

  it('uses a 15 minute window', async () => {
    const { EXPIRY_MS } = await freshStore()
    expect(EXPIRY_MS).toBe(15 * MIN)
  })

  it('isExpired is false before 15 minutes and true after', async () => {
    const { isExpired } = await freshStore()
    expect(isExpired(Date.now() - 14 * MIN)).toBe(false)
    expect(isExpired(Date.now() - 15 * MIN)).toBe(true)
    expect(isExpired(0)).toBe(false) // no timestamp = nothing in progress
  })

  it('keeps a box saved less than 15 minutes ago', async () => {
    localStorage.setItem('lumiere-cart-v2', JSON.stringify(BOX))
    localStorage.setItem('lumiere-order-ts', String(Date.now() - 5 * MIN))
    const { getInitialOrder } = await freshStore()
    expect(getInitialOrder()).toEqual({ boxes: BOX, expired: false })
  })

  it('wipes a box left for 15+ minutes and flags it so the modal shows', async () => {
    localStorage.setItem('lumiere-cart-v2', JSON.stringify(BOX))
    localStorage.setItem('lumiere-order-ts', String(Date.now() - 16 * MIN))
    const { getInitialOrder } = await freshStore()
    expect(getInitialOrder()).toEqual({ boxes: [], expired: true })
    expect(localStorage.getItem('lumiere-cart-v2')).toBeNull()
    expect(localStorage.getItem('lumiere-order-ts')).toBeNull()
  })

  it('silently drops a saved cart that has no timestamp (older version)', async () => {
    localStorage.setItem('lumiere-cart-v2', JSON.stringify(BOX))
    const { getInitialOrder } = await freshStore()
    expect(getInitialOrder()).toEqual({ boxes: [], expired: false })
  })

  it('survives corrupted storage', async () => {
    localStorage.setItem('lumiere-cart-v2', '{not json')
    const { getInitialOrder } = await freshStore()
    expect(getInitialOrder().boxes).toEqual([])
  })

  it('touchOrder / clearOrderTs / readTs round-trip', async () => {
    const { touchOrder, clearOrderTs, readTs } = await freshStore()
    expect(readTs()).toBe(0)
    touchOrder()
    expect(Date.now() - readTs()).toBeLessThan(1000)
    clearOrderTs()
    expect(readTs()).toBe(0)
  })
})
