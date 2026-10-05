import { SITE } from '../data/site'
import Sun from './Sun'

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-text">
        <p className="eyebrow">Repostería artesanal</p>
        <h1>Alfajores argentinos, hechos a mano con cariño</h1>
        <p className="lead">
          Tapitas de maicena que se deshacen en la boca, dulce de leche generoso y el sabor de casa en cada bocado.
          Pedí online y recibí {SITE.name} fresquitos.
        </p>
        <div className="hero-cta">
          <a className="btn" href="#productos">Ver productos</a>
          <a className="btn btn-ghost" href="#como-pedir">¿Cómo pedir?</a>
        </div>
      </div>
      <div className="hero-art">
        <Sun className="hero-sun" />
        <img src="/logo.webp" alt="Logo de Lumière Artesanal" width="320" height="320" className="hero-logo" />
      </div>
    </section>
  )
}
