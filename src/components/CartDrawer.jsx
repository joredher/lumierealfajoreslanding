import { useState } from 'react'
import { BOX_PRICE, BOX_SIZE, FLAVORS, SITE, formatPrice } from '../data/site'

const flavorName = (id) => FLAVORS.find((f) => f.id === id)?.name ?? id
const describe = (flavors) =>
  Object.entries(flavors).map(([id, q]) => `${q} x ${flavorName(id)}`)

export default function CartDrawer({ open, onClose, cart, onBuild }) {
  const [form, setForm] = useState({ name: '', phone: '', delivery: 'retiro', address: '', notes: '' })
  const { boxes } = cart
  const total = boxes.length * BOX_PRICE
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const text = [
      `Hola ${SITE.name}! Quiero hacer un pedido:`,
      ...boxes.flatMap((b, i) => [`Caja ${i + 1} (${BOX_SIZE} alfajores) — ${formatPrice(BOX_PRICE)}`, ...describe(b.flavors).map((l) => `   • ${l}`)]),
      `Total: ${formatPrice(total)}`,
      '',
      `Nombre: ${form.name}`,
      `Teléfono: ${form.phone}`,
      form.delivery === 'envio' ? `Domicilio en ${SITE.city}: ${form.address}` : 'Recogida en persona',
      ...(form.notes ? [`Notas: ${form.notes}`] : []),
    ].join('\n')
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    cart.clear()
    onClose()
  }

  return (
    <>
      <div className={`overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Carrito">
        <div className="drawer-head">
          <h2>Tu pedido</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        {boxes.length === 0 ? (
          <div className="empty">
            <p>Tu pedido está vacío. ¡Arma tu caja! 🍪</p>
            <button className="btn" onClick={() => { onClose(); onBuild() }}>Armar caja</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <ul className="lines">
              {boxes.map((b, i) => (
                <li key={b.uid}>
                  <div>
                    <strong>Caja {i + 1} · {formatPrice(BOX_PRICE)}</strong>
                    {describe(b.flavors).map((l) => <small key={l}>{l}</small>)}
                  </div>
                  <button type="button" className="icon-btn" onClick={() => cart.remove(b.uid)} aria-label={`Quitar caja ${i + 1}`}>🗑</button>
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => { onClose(); onBuild() }}>+ Otra caja</button>
            <p className="total">Total <strong>{formatPrice(total)}</strong></p>

            <label>Nombre<input required value={form.name} onChange={update('name')} autoComplete="name" /></label>
            <label>Teléfono<input required type="tel" value={form.phone} onChange={update('phone')} autoComplete="tel" /></label>
            <label>Entrega
              <select value={form.delivery} onChange={update('delivery')}>
                <option value="retiro">Recoger en persona</option>
                <option value="envio">Domicilio en {SITE.city}</option>
              </select>
            </label>
            {form.delivery === 'envio' && (
              <label>Dirección<input required value={form.address} onChange={update('address')} autoComplete="street-address" /></label>
            )}
            <label>Notas (opcional)<textarea rows="2" value={form.notes} onChange={update('notes')} /></label>

            <button className="btn btn-full" type="submit">Enviar pedido por WhatsApp</button>
            <p className="fine">Te responderemos para confirmar disponibilidad, pago y entrega.</p>
          </form>
        )}
      </aside>
    </>
  )
}
