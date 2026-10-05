import { useState } from 'react'
import { BOX_SIZE, FLAVORS, SITE, formatPrice, sizeOf } from '../data/site'
import { CloseIcon, TrashIcon } from './Icons'

const flavorOf = (id) => FLAVORS.find((f) => f.id === id)
const describe = (flavors) => Object.entries(flavors).map(([id, q]) => `${q} x ${flavorOf(id)?.name ?? id}`)
const priceOf = (box) => sizeOf(box.size).price

export default function CartDrawer({ open, onClose, cart, onBuild }) {
  const [form, setForm] = useState({ name: '', phone: '', delivery: 'retiro', address: '', notes: '' })
  const { boxes } = cart
  const total = boxes.reduce((s, b) => s + priceOf(b), 0)
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const text = [
      `Hola ${SITE.name}! Quiero hacer un pedido:`,
      ...boxes.flatMap((b, i) => [
        `Caja ${i + 1} ${sizeOf(b.size).label.toUpperCase()} (${BOX_SIZE} alfajores) — ${formatPrice(priceOf(b))}`,
        ...describe(b.flavors).map((l) => `   • ${l}`),
      ]),
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

  const addAnother = () => { onClose(); onBuild() }

  return (
    <>
      <div className={`overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open} inert={!open} role="dialog" aria-label="Mi pedido">
        <div className="drawer-head">
          <h2>Mi pedido</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar"><CloseIcon /></button>
        </div>
        {boxes.length === 0 ? (
          <div className="empty">
            <img src="/logo.webp" alt="" width="96" height="96" />
            <p>Aún no has armado ninguna caja.</p>
            <button className="btn" onClick={addAnother}>Arma tu caja</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <ul className="boxes">
              {boxes.map((b, i) => (
                <li key={b.uid} className="box-card">
                  <div className="box-top">
                    <strong>Caja {i + 1} · {sizeOf(b.size).label}</strong>
                    <span className="box-price">{formatPrice(priceOf(b))}</span>
                    <button type="button" className="icon-btn sm" onClick={() => cart.remove(b.uid)} aria-label={`Quitar caja ${i + 1}`}><TrashIcon width="18" height="18" /></button>
                  </div>
                  <ul className="chips">
                    {Object.entries(b.flavors).map(([id, q]) => (
                      <li key={id}>
                        <img src={flavorOf(id)?.image} alt="" width="34" height="34" />
                        <span>{flavorOf(id)?.name}</span>
                        <b>×{q}</b>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addAnother}>+ Agregar otra caja</button>
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
