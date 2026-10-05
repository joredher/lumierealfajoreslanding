import { PRODUCTS, formatPrice } from '../data/site'
import Sun from './Sun'

export default function Products({ onAdd }) {
  return (
    <section id="productos" className="section">
      <h2>Nuestros productos</h2>
      <p className="section-sub">Elaborados en pequeñas tandas, con ingredientes de calidad.</p>
      <div className="grid">
        {PRODUCTS.map((p) => (
          <article key={p.id} className="card">
            <div className="card-img">
              {p.image ? <img src={p.image} alt={p.name} loading="lazy" /> : <Sun className="card-sun" rays={12} />}
              {p.badge && <span className="badge">{p.badge}</span>}
            </div>
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <div className="card-foot">
              <div>
                <strong className="price">{formatPrice(p.price)}</strong>
                <small> · {p.unit}</small>
              </div>
              <button className="btn btn-sm" onClick={() => onAdd(p.id)}>Agregar</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
