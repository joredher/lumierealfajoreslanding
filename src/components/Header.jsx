import { useEffect, useState } from 'react'
import { SITE } from '../data/site'
import { BagIcon } from './Icons'

const LINKS = [
  ['sabores', 'Sabores'],
  ['historia', 'Nosotros'],
  ['como-pedir', 'Cómo pedir'],
  ['contacto', 'Contacto'],
]

export default function Header({ count, onCart }) {
  const [active, setActive] = useState('')

  // highlight the nav link of the section currently in view
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header className="header">
      <a href="#inicio" className="brand" aria-label={SITE.name}>
        <img src="/img/lumiere-artesanal-logo.webp" alt="" width="48" height="48" />
        <span>{SITE.name}</span>
      </a>
      <nav aria-label="Principal">
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>{label}</a>
        ))}
      </nav>
      <button
        key={count}
        className={`cart-btn ${count ? 'has-items' : ''}`}
        onClick={onCart}
        aria-label={`Abrir mi pedido, ${count} ${count === 1 ? 'caja' : 'cajas'}`}
      >
        <BagIcon />
        {count > 0 && <span className="cart-badge">{count}</span>}
      </button>
    </header>
  )
}
