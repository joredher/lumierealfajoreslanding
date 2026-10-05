import { BOX_SIZE, FLAVORS, SIZES, formatPrice } from '../data/site'
import { ZoomIcon } from './Icons'
import Reveal from './Reveal'

export default function Products({ draft, onPick, onView }) {
  return (
    <section id="sabores" className="section">
      <Reveal as="h2" className="h-deco">Conoce nuestros sabores</Reveal>
      <Reveal as="p" className="section-sub" delay={80}>
        Toca una foto para verla de cerca. Arma tu caja de {BOX_SIZE} mezclando sabores:{' '}
        {SIZES.map((s) => `${s.label.toLowerCase()}s ${formatPrice(s.price)}`).join(' · ')}.
      </Reveal>
      <div className="grid">
        {FLAVORS.map((f, i) => (
          <Reveal as="article" key={f.id} className="card" delay={(i % 3) * 110} style={{ '--tint': f.tint }}>
            <button className="card-img" onClick={() => onView(i)} aria-label={`Ver ${f.name} de cerca`}>
              <img src={f.image} alt={`Alfajor ${f.name}`} loading="lazy" width="810" height="675" />
              <span className="card-peek"><ZoomIcon width="18" height="18" /> Ver de cerca</span>
              {f.isNew && <span className="badge">Nuevo sabor ✨</span>}
              {draft[f.id] > 0 && <span className="badge in-box">En tu caja: {draft[f.id]}</span>}
            </button>
            <h3>{f.name}</h3>
            <p>{f.desc}</p>
            <button className="btn btn-sm" onClick={() => onPick(f.id)}>Agregar a mi caja</button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
