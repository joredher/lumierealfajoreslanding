import { BOX_PRICE, BOX_SIZE, FLAVORS, formatPrice } from '../data/site'

export const countOf = (draft) => Object.values(draft).reduce((a, b) => a + b, 0)

export function FloatingButton({ draft, onClick }) {
  const n = countOf(draft)
  return (
    <button className="fab" onClick={onClick} aria-label="Armar mi caja">
      <span className="fab-icon">🍪</span>
      <span>
        Arma tu caja
        <small>{n > 0 ? `${n}/${BOX_SIZE} elegidos` : `${BOX_SIZE} alfajores · ${formatPrice(BOX_PRICE)}`}</small>
      </span>
    </button>
  )
}

export default function BoxBuilder({ open, onClose, draft, setDraft, onDone }) {
  const n = countOf(draft)
  const full = n === BOX_SIZE
  const change = (id, delta) => {
    const q = (draft[id] || 0) + delta
    if (q < 0 || (delta > 0 && n >= BOX_SIZE)) return
    const next = { ...draft }
    if (q === 0) delete next[id]
    else next[id] = q
    setDraft(next)
  }

  return (
    <>
      <div className={`overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <section className={`sheet ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Arma tu caja">
        <div className="drawer-head">
          <h2>Arma tu caja de {BOX_SIZE}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        <p className="section-sub left">
          Elige {BOX_SIZE} sabores (puedes repetir) · {formatPrice(BOX_PRICE)}
        </p>
        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={BOX_SIZE} aria-valuenow={n}>
          {Array.from({ length: BOX_SIZE }, (_, i) => (
            <span key={i} className={i < n ? 'on' : ''} />
          ))}
        </div>

        <ul className="pick-list">
          {FLAVORS.map((f) => (
            <li key={f.id}>
              <img src={f.image} alt="" width="64" height="64" loading="lazy" />
              <span className="pick-name">{f.name}</span>
              <div className="qty">
                <button type="button" onClick={() => change(f.id, -1)} disabled={!draft[f.id]} aria-label={`Quitar ${f.name}`}>−</button>
                <span>{draft[f.id] || 0}</span>
                <button type="button" onClick={() => change(f.id, 1)} disabled={full} aria-label={`Agregar ${f.name}`}>+</button>
              </div>
            </li>
          ))}
        </ul>

        <button className="btn btn-full" disabled={!full} onClick={onDone}>
          {full ? `Agregar caja · ${formatPrice(BOX_PRICE)}` : `Faltan ${BOX_SIZE - n} sabor${BOX_SIZE - n > 1 ? 'es' : ''}`}
        </button>
      </section>
    </>
  )
}
