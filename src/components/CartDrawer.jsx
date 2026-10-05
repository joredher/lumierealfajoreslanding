import { useState } from 'react'
import { BOX_SIZE, DELIVERY_FEE, FLAVORS, SITE, formatPrice, itemPrice, itemUnits, sizeOf } from '../data/site'
import { CloseIcon, TrashIcon } from './Icons'

const flavorOf = (id) => FLAVORS.find((f) => f.id === id)
const describe = (flavors) => Object.entries(flavors).map(([id, q]) => `${q} x ${flavorOf(id)?.name ?? id}`)
const isLoose = (item) => item.kind === 'loose'
const titleOf = (item) =>
  isLoose(item) ? `${itemUnits(item)} alfajores sueltos · ${sizeOf(item.size).label}` : `Caja de ${BOX_SIZE} · ${sizeOf(item.size).label}`

export default function CartDrawer({ open, onClose, cart, onBuild }) {
  const [form, setForm] = useState({ name: '', phone: '', delivery: 'retiro', address: '', notes: '' })
  const { boxes } = cart
  const delivery = form.delivery === 'envio'
  const subtotal = boxes.reduce((s, b) => s + itemPrice(b), 0)
  const total = subtotal + (delivery ? DELIVERY_FEE : 0)
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const text = [
      `Hola ${SITE.name}! Quiero hacer un pedido:`,
      ...boxes.flatMap((b) => [
        `${titleOf(b).replace(' · ', ' ').toUpperCase()} — ${formatPrice(itemPrice(b))}`,
        ...describe(b.flavors).map((l) => `   • ${l}`),
      ]),
      `Subtotal: ${formatPrice(subtotal)}`,
      ...(delivery ? [`Domicilio: ${formatPrice(DELIVERY_FEE)}`] : []),
      `Total: ${formatPrice(total)}`,
      '',
      `Nombre: ${form.name}`,
      `Teléfono: ${form.phone}`,
      delivery ? `Domicilio en ${SITE.city}: ${form.address}` : 'Recogida en persona',
      ...(form.notes ? [`Notas: ${form.notes}`] : []),
    ].join('\n')
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    // GA4 (only present when VITE_GA_ID is set): count the order as a lead
    window.gtag?.('event', 'generate_lead', { currency: SITE.currency, value: total })
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
            <img src="/img/lumiere-artesanal-logo.webp" alt="" width="96" height="96" />
            <p>Aún no has elegido nada.</p>
            <button className="btn" onClick={addAnother}>Haz tu pedido</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <ul className="boxes">
              {boxes.map((b) => (
                <li key={b.uid} className="box-card">
                  <div className="box-top">
                    <strong>{titleOf(b)}</strong>
                    <span className="box-price">{formatPrice(itemPrice(b))}</span>
                    <button type="button" className="icon-btn sm" onClick={() => cart.remove(b.uid)} aria-label={`Quitar ${titleOf(b)}`}><TrashIcon width="18" height="18" /></button>
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
            <button type="button" className="btn btn-ghost btn-sm" onClick={addAnother}>+ Agregar más</button>

            <dl className="totals">
              <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
              {delivery && <div><dt>Domicilio</dt><dd>{formatPrice(DELIVERY_FEE)}</dd></div>}
              <div className="total"><dt>Total</dt><dd><strong>{formatPrice(total)}</strong></dd></div>
            </dl>

            <label>Nombre<input required value={form.name} onChange={update('name')} autoComplete="name" /></label>
            <label>Teléfono<input required type="tel" value={form.phone} onChange={update('phone')} autoComplete="tel" /></label>
            <label>Entrega
              <select value={form.delivery} onChange={update('delivery')}>
                <option value="retiro">Recoger en persona (sin costo)</option>
                <option value="envio">Domicilio en {SITE.city} (+{formatPrice(DELIVERY_FEE)})</option>
              </select>
            </label>
            {delivery && (
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
