import { BOX_PRICE, BOX_SIZE, FLAVORS, formatPrice } from '../data/site'

export default function Products({ draft, onPick }) {
  return (
    <section id="sabores" className="section">
      <h2>Conoce nuestros sabores</h2>
      <p className="section-sub">
        Elige tu favorito. Arma tu caja de {BOX_SIZE} alfajores mezclando los sabores que quieras por {formatPrice(BOX_PRICE)}.
      </p>
      <div className="grid">
        {FLAVORS.map((f) => (
          <article key={f.id} className="card">
            <div className="card-img">
              <img src={f.image} alt={`Alfajor ${f.name}`} loading="lazy" width="810" height="675" />
              {f.isNew && <span className="badge">Nuevo sabor ✨</span>}
              {draft[f.id] > 0 && <span className="badge in-box">En tu caja: {draft[f.id]}</span>}
            </div>
            <h3>{f.name}</h3>
            <p>{f.desc}</p>
            <button className="btn btn-sm" onClick={() => onPick(f.id)}>Agregar a mi caja</button>
          </article>
        ))}
      </div>
    </section>
  )
}
