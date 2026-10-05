import { BOX_SIZE, SIZES, SITE, formatPrice } from '../data/site'
import Sun from './Sun'

export default function Hero({ onBuild }) {
  return (
    <section id="inicio" className="hero">
      <div className="hero-text">
        <p className="eyebrow">Alfajores artesanales · {SITE.city}</p>
        <h1>Alfajores hechos a mano, con sabor a casa</h1>
        <p className="lead">
          Bizcocho suave, arequipe generoso y sabores para todos los gustos. Arma tu caja de {BOX_SIZE} mezclando los
          que más te gusten: {SIZES.map((s) => `${s.label.toLowerCase()}s ${formatPrice(s.price)}`).join(' o ')}.
        </p>
        <div className="hero-cta">
          <button className="btn" onClick={onBuild}>Arma tu caja</button>
          <a className="btn btn-ghost" href="#sabores">Ver sabores</a>
        </div>
      </div>
      <div className="hero-art">
        <Sun className="hero-sun" />
        <img src="/logo.webp" alt="Logo de Lumière Artesanal" width="320" height="320" className="hero-logo" />
      </div>
    </section>
  )
}
