import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import CartDrawer from './components/CartDrawer'
import { About, HowTo, Contact, Footer } from './components/Sections'
import { useCart } from './useCart'

export default function App() {
  const cart = useCart()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Header count={cart.count} onCart={() => setOpen(true)} />
      <main>
        <Hero />
        <Products onAdd={(id) => { cart.add(id); setOpen(true) }} />
        <About />
        <HowTo />
        <Contact />
      </main>
      <Footer />
      <CartDrawer open={open} onClose={() => setOpen(false)} cart={cart} />
    </>
  )
}
