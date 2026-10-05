import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import CartDrawer from './components/CartDrawer'
import BoxBuilder, { FloatingButton, countOf } from './components/BoxBuilder'
import FlavorViewer from './components/FlavorViewer'
import ExpiredModal from './components/ExpiredModal'
import ScrollFX from './components/ScrollFX'
import WhatsAppFab from './components/WhatsAppFab'
import { About, Rolls, HowTo, Contact, Footer } from './components/Sections'
import { useCart } from './useCart'
import { useOrderExpiry } from './useOrderExpiry'
import { clearOrderTs, getInitialOrder } from './orderStore'
import { BOX_SIZE, DEFAULT_SIZE, FLAVORS } from './data/site'

export default function App() {
  const cart = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [builderOpen, setBuilderOpen] = useState(false)
  const [viewing, setViewing] = useState(null) // flavour index or null
  const [draft, setDraft] = useState({})
  const [size, setSize] = useState(DEFAULT_SIZE)
  // true when a saved order was left untouched for 15+ minutes (or the order just expired on screen)
  const [expired, setExpired] = useState(() => getInitialOrder().expired)
  const boxFull = countOf(draft) >= BOX_SIZE

  const resetOrder = () => {
    cart.clear()
    setDraft({})
    setSize(DEFAULT_SIZE)
    setCartOpen(false)
    setBuilderOpen(false)
    setViewing(null)
    clearOrderTs()
    setExpired(true)
  }
  useOrderExpiry(draft, cart.boxes, resetOrder)

  const addToDraft = (id) => !boxFull && setDraft((d) => ({ ...d, [id]: (d[id] || 0) + 1 }))
  const pick = (id) => {
    addToDraft(id)
    setBuilderOpen(true)
  }
  const finishBox = () => {
    cart.add(draft, size)
    setDraft({})
    setBuilderOpen(false)
    setCartOpen(true)
  }
  const nav = useCallback((d) => setViewing((i) => (i === null ? i : (i + d + FLAVORS.length) % FLAVORS.length)), [])

  const anyOpen = cartOpen || builderOpen || viewing !== null || expired
  // lock page scroll behind panels; Esc closes whatever is on top
  useEffect(() => {
    document.body.style.overflow = anyOpen ? 'hidden' : ''
    if (!anyOpen) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (expired) setExpired(false)
      else if (viewing !== null) setViewing(null)
      else if (builderOpen) setBuilderOpen(false)
      else setCartOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [anyOpen, expired, viewing, builderOpen])

  return (
    <>
      <ScrollFX />
      <Header count={cart.boxes.length} onCart={() => setCartOpen(true)} />
      <main>
        <Hero onBuild={() => setBuilderOpen(true)} />
        <Products draft={draft} onPick={pick} onView={setViewing} />
        <Rolls />
        <About />
        <HowTo />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <FloatingButton draft={draft} size={size} onClick={() => setBuilderOpen(true)} />
      <FlavorViewer
        index={viewing}
        onClose={() => setViewing(null)}
        onNav={nav}
        draft={draft}
        boxFull={boxFull}
        onAdd={addToDraft}
        onOpenBox={() => { setViewing(null); setBuilderOpen(true) }}
      />
      <BoxBuilder open={builderOpen} onClose={() => setBuilderOpen(false)} draft={draft} setDraft={setDraft} size={size} setSize={setSize} onDone={finishBox} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onBuild={() => setBuilderOpen(true)} />
      <ExpiredModal
        open={expired}
        onClose={() => setExpired(false)}
        onRestart={() => { setExpired(false); setBuilderOpen(true) }}
      />
    </>
  )
}
