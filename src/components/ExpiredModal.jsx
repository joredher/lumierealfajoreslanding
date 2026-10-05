import { CloseIcon } from './Icons'
import { IMAGES } from '../data/site'

// Shown after the in-progress order was reset for inactivity.
export default function ExpiredModal({ open, onClose, onRestart }) {
  if (!open) return null
  return (
    <div className="modal" role="alertdialog" aria-modal="true" aria-labelledby="expired-title" aria-describedby="expired-text">
      <div className="viewer-backdrop" onClick={onClose} />
      <div className="modal-card">
        <button className="icon-btn modal-close" onClick={onClose} aria-label="Cerrar"><CloseIcon /></button>
        <img src={IMAGES.logo.src} alt="" width="72" height="72" />
        <h2 id="expired-title">Tu selección expiró</h2>
        <p id="expired-text">
          Por seguridad, vaciamos tu pedido cuando pasan unos minutos sin enviarlo. No se envió nada.
          Vuelve a elegir tus alfajores para continuar.
        </p>
        <div className="viewer-actions">
          <button className="btn" onClick={onRestart} autoFocus>Elegir mis alfajores</button>
          <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}
