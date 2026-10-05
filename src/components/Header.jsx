import { SITE } from '../data/site'

export default function Header({ count, onCart }) {
  return (
    <header className="header">
      <a href="#inicio" className="brand" aria-label={SITE.name}>
        <img src="/logo.webp" alt="" width="48" height="48" />
        <span>{SITE.name}</span>
      </a>
      <nav aria-label="Principal">
        <a href="#productos">Productos</a>
        <a href="#historia">Nosotros</a>
        <a href="#como-pedir">Cómo pedir</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <button className="cart-btn" onClick={onCart} aria-label={`Abrir carrito, ${count} productos`}>
        🛒 <span className="cart-count">{count}</span>
      </button>
    </header>
  )
}
