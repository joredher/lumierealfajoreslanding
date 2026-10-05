import { BOX_SIZE, IMAGES, SIZES, SITE, formatPrice } from '../data/site'
import Sun from './Sun'

export default function Hero({ onBuild }) {
  return (
    <section id="inicio" className="hero">
      <div className="hero-text">
        <p className="eyebrow">Recetas argentinas · Hechos en {SITE.city}</p>
        <h1>Alfajores artesanales hechos a mano en Yopal</h1>
        <p className="lead">
          Preparamos alfajores con recetas argentinas, bizcocho suave y arequipe generoso. Elige entre 9 sabores y arma
          tu caja de {BOX_SIZE}: {SIZES.map((s) => `${s.label.toLowerCase()}s ${formatPrice(s.price)}`).join(' o ')}.
        </p>
        <div className="hero-cta">
          <button className="btn" onClick={onBuild}>Arma tu caja de alfajores</button>
          <a className="btn btn-ghost" href="#sabores">Ver los 9 sabores</a>
        </div>
      </div>
      <div className="hero-art">
        <Sun className="hero-sun" />
        <img src={IMAGES.logo.src} alt={IMAGES.logo.alt} width={IMAGES.logo.width} height={IMAGES.logo.height} className="hero-logo" fetchPriority="high" />
      </div>
    </section>
  )
}
