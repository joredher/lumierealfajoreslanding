import { useState } from 'react'
import { PRODUCTS, SITE, formatPrice } from '../data/site'

export default function CartDrawer({ open, onClose, cart }) {
  const [form, setForm] = useState({ name: '', phone: '', delivery: 'retiro', address: '', notes: '' })
  const lines = PRODUCTS.filter((p) => cart.items[p.id]).map((p) => ({ ...p, qty: cart.items[p.id] }))
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0)
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const text = [
      `Hola ${SITE.name}! Quiero hacer un pedido:`,
      ...lines.map((l) => `• ${l.qty} x ${l.name} (${l.unit}) — ${formatPrice(l.price * l.qty)}`),
      `Total: ${formatPrice(total)}`,
      '',
      `Nombre: ${form.name}`,
      `Teléfono: ${form.phone}`,
      form.delivery === 'envio' ? `Envío a: ${form.address}` : 'Retiro en persona',
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
        {lines.length === 0 ? (
          <p className="empty">Tu carrito está vacío. ¡Agregá algo rico! 🍪</p>
        ) : (
          <form onSubmit={submit}>
            <ul className="lines">
              {lines.map((l) => (
                <li key={l.id}>
                  <div>
                    <strong>{l.name}</strong>
                    <small>{l.unit} · {formatPrice(l.price)}</small>
                  </div>
                  <div className="qty">
                    <button type="button" onClick={() => cart.set(l.id, l.qty - 1)} aria-label="Quitar uno">−</button>
                    <span>{l.qty}</span>
                    <button type="button" onClick={() => cart.set(l.id, l.qty + 1)} aria-label="Agregar uno">+</button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="total">Total <strong>{formatPrice(total)}</strong></p>

            <label>Nombre<input required value={form.name} onChange={update('name')} autoComplete="name" /></label>
            <label>Teléfono<input required type="tel" value={form.phone} onChange={update('phone')} autoComplete="tel" /></label>
            <label>Entrega
              <select value={form.delivery} onChange={update('delivery')}>
                <option value="retiro">Retiro en persona</option>
                <option value="envio">Envío a domicilio</option>
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
