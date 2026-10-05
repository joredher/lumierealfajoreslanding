import { BOX_SIZE, FLAVORS, SIZES, formatPrice, sizeOf } from '../data/site'
import { BoxIcon, CloseIcon } from './Icons'

export const countOf = (draft) => Object.values(draft).reduce((a, b) => a + b, 0)

export function FloatingButton({ draft, size, onClick }) {
  const n = countOf(draft)
  return (
    <button className="fab" onClick={onClick} aria-label="Armar mi caja">
      <BoxIcon width="28" height="28" />
      <span>
        Arma tu caja
        <small>
          {n > 0
            ? `${n}/${BOX_SIZE} elegidos · ${sizeOf(size).label}`
            : `${BOX_SIZE} alfajores · desde ${formatPrice(Math.min(...SIZES.map((s) => s.price)))}`}
        </small>
      </span>
    </button>
  )
}

export default function BoxBuilder({ open, onClose, draft, setDraft, size, setSize, onDone }) {
  const n = countOf(draft)
  const full = n === BOX_SIZE
  const price = sizeOf(size).price
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
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open} inert={!open} role="dialog" aria-label="Arma tu caja">
        <div className="drawer-head">
          <h2>Arma tu caja</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar"><CloseIcon /></button>
        </div>

        <fieldset className="size-pick">
          <legend>1. Elige el tamaño</legend>
          {SIZES.map((s) => (
            <label key={s.id} className={size === s.id ? 'on' : ''}>
              <input type="radio" name="size" value={s.id} checked={size === s.id} onChange={() => setSize(s.id)} />
              <strong>{s.label}</strong>
              <span className="size-price">{formatPrice(s.price)}</span>
              <small>caja de {BOX_SIZE}</small>
            </label>
          ))}
        </fieldset>

        <p className="section-sub left">2. Elige {BOX_SIZE} sabores (puedes repetir)</p>
        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={BOX_SIZE} aria-valuenow={n}>
          {Array.from({ length: BOX_SIZE }, (_, i) => (
            <span key={i} className={i < n ? 'on' : ''} />
          ))}
        </div>

        <ul className="pick-list">
          {FLAVORS.map((f) => (
            <li key={f.id} className={draft[f.id] ? 'chosen' : ''}>
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

        <div className="drawer-foot">
          <button className="btn btn-full" disabled={!full} onClick={onDone}>
            {full ? `Agregar caja ${sizeOf(size).label.toLowerCase()} · ${formatPrice(price)}` : `Faltan ${BOX_SIZE - n} sabor${BOX_SIZE - n > 1 ? 'es' : ''}`}
          </button>
        </div>
      </aside>
    </>
  )
}
