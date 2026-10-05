import { BOX_SIZE, FLAVORS, MAX_LOOSE, MIN_LOOSE, SIZES, formatPrice, sizeOf } from '../data/site'
import { BoxIcon, CloseIcon } from './Icons'

export const countOf = (draft) => Object.values(draft).reduce((a, b) => a + b, 0)

export const MODES = [
  { id: 'box', label: `Caja de ${BOX_SIZE}` },
  { id: 'loose', label: `Sueltos (mín. ${MIN_LOOSE})` },
]

// How many alfajores this order can hold, and whether the draft is ready to add.
export const limitOf = (mode) => (mode === 'box' ? BOX_SIZE : MAX_LOOSE)
export const isReady = (mode, n) => (mode === 'box' ? n === BOX_SIZE : n >= MIN_LOOSE)
export const draftPrice = (mode, size, n) => (mode === 'box' ? sizeOf(size).price : n * sizeOf(size).unitPrice)

export function FloatingButton({ draft, mode, size, onClick }) {
  const n = countOf(draft)
  const cheapest = Math.min(...SIZES.map((s) => s.price))
  return (
    <button className="fab" onClick={onClick} aria-label="Hacer mi pedido">
      <BoxIcon width="28" height="28" />
      <span>
        Haz tu pedido
        <small>
          {n > 0
            ? mode === 'box'
              ? `${n}/${BOX_SIZE} elegidos · ${sizeOf(size).label}`
              : `${n} suelto${n > 1 ? 's' : ''} · ${sizeOf(size).label}`
            : `Caja de ${BOX_SIZE} desde ${formatPrice(cheapest)} o sueltos`}
        </small>
      </span>
    </button>
  )
}

export default function BoxBuilder({ open, onClose, draft, setDraft, mode, setMode, size, setSize, onDone }) {
  const n = countOf(draft)
  const limit = limitOf(mode)
  const atLimit = n >= limit
  const ready = isReady(mode, n)
  const price = draftPrice(mode, size, n)
  const sz = sizeOf(size)

  const change = (id, delta) => {
    const q = (draft[id] || 0) + delta
    if (q < 0 || (delta > 0 && atLimit)) return
    const next = { ...draft }
    if (q === 0) delete next[id]
    else next[id] = q
    setDraft(next)
  }

  let cta
  if (mode === 'box') {
    cta = ready ? `Agregar caja ${sz.label.toLowerCase()} · ${formatPrice(price)}` : `Faltan ${BOX_SIZE - n} sabor${BOX_SIZE - n > 1 ? 'es' : ''}`
  } else if (ready) {
    cta = `Agregar ${n} alfajores ${sz.label.toLowerCase()}s · ${formatPrice(price)}`
  } else {
    cta = n === 0 ? `Elige al menos ${MIN_LOOSE} alfajores` : `Falta ${MIN_LOOSE - n} alfajor para el mínimo`
  }
  // 4 loose big ones cost more than the box: nudge towards the box
  const boxIsCheaper = mode === 'loose' && n === BOX_SIZE && price > sz.price

  return (
    <>
      <div className={`overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open} inert={!open} role="dialog" aria-label="Arma tu caja">
        <div className="drawer-head">
          <h2>Haz tu pedido</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar"><CloseIcon /></button>
        </div>

        <div className="mode-pick" role="radiogroup" aria-label="Tipo de pedido">
          {MODES.map((m) => (
            <label key={m.id} className={mode === m.id ? 'on' : ''}>
              <input type="radio" name="mode" value={m.id} checked={mode === m.id} onChange={() => setMode(m.id)} />
              {m.label}
            </label>
          ))}
        </div>

        <fieldset className="size-pick">
          <legend>Elige el tamaño</legend>
          {SIZES.map((s) => (
            <label key={s.id} className={size === s.id ? 'on' : ''}>
              <input type="radio" name="size" value={s.id} checked={size === s.id} onChange={() => setSize(s.id)} />
              <strong>{s.label}</strong>
              <span className="size-price">{formatPrice(mode === 'box' ? s.price : s.unitPrice)}</span>
              <small>{mode === 'box' ? `caja de ${BOX_SIZE}` : 'cada uno'}</small>
            </label>
          ))}
        </fieldset>

        <p className="section-sub left">
          {mode === 'box' ? `Elige ${BOX_SIZE} sabores (puedes repetir)` : `Elige tus sabores (mínimo ${MIN_LOOSE}, puedes repetir)`}
        </p>
        {mode === 'box' ? (
          <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={BOX_SIZE} aria-valuenow={n}>
            {Array.from({ length: BOX_SIZE }, (_, i) => (
              <span key={i} className={i < n ? 'on' : ''} />
            ))}
          </div>
        ) : (
          <p className="loose-total" aria-live="polite">
            {n} alfajor{n === 1 ? '' : 'es'} · <strong>{formatPrice(price)}</strong>
          </p>
        )}

        <ul className="pick-list">
          {FLAVORS.map((f) => (
            <li key={f.id} className={draft[f.id] ? 'chosen' : ''}>
              <img src={f.image} alt="" width="64" height="64" loading="lazy" />
              <span className="pick-name">{f.name}</span>
              <div className="qty">
                <button type="button" onClick={() => change(f.id, -1)} disabled={!draft[f.id]} aria-label={`Quitar ${f.name}`}>−</button>
                <span>{draft[f.id] || 0}</span>
                <button type="button" onClick={() => change(f.id, 1)} disabled={atLimit} aria-label={`Agregar ${f.name}`}>+</button>
              </div>
            </li>
          ))}
        </ul>

        <div className="drawer-foot">
          {boxIsCheaper && (
            <p className="tip">
              💡 La caja de {BOX_SIZE} {sz.label.toLowerCase()}s cuesta {formatPrice(sz.price)}, menos que {BOX_SIZE} sueltos.{' '}
              <button type="button" className="link-btn" onClick={() => setMode('box')}>Cambiar a caja</button>
            </p>
          )}
          <button className="btn btn-full" disabled={!ready} onClick={onDone}>{cta}</button>
        </div>
      </aside>
    </>
  )
}
