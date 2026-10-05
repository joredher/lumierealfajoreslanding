import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import CartDrawer from './components/CartDrawer'
import BoxBuilder, { FloatingButton, countOf } from './components/BoxBuilder'
import { About, HowTo, Contact, Footer } from './components/Sections'
import { useCart } from './useCart'
import { BOX_SIZE } from './data/site'

export default function App() {
  const cart = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [builderOpen, setBuilderOpen] = useState(false)
  const [draft, setDraft] = useState({})

  const pick = (id) => {
    if (countOf(draft) < BOX_SIZE) setDraft({ ...draft, [id]: (draft[id] || 0) + 1 })
    setBuilderOpen(true)
  }
  const finishBox = () => {
    cart.add(draft)
    setDraft({})
    setBuilderOpen(false)
    setCartOpen(true)
  }

  return (
    <>
      <Header count={cart.boxes.length} onCart={() => setCartOpen(true)} />
      <main>
        <Hero onBuild={() => setBuilderOpen(true)} />
        <Products draft={draft} onPick={pick} />
        <About />
        <HowTo />
        <Contact />
      </main>
      <Footer />
      <FloatingButton draft={draft} onClick={() => setBuilderOpen(true)} />
      <BoxBuilder open={builderOpen} onClose={() => setBuilderOpen(false)} draft={draft} setDraft={setDraft} onDone={finishBox} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onBuild={() => setBuilderOpen(true)} />
    </>
  )
}
