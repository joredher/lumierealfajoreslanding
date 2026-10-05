import { useEffect, useRef, useState } from 'react'
import { SITE } from '../data/site'
import { CloseIcon } from './Icons'

const WaIcon = (p) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 7c0 5.45-4.44 9.88-9.89 9.88ZM20.46 3.49A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.48-8.41Z" />
  </svg>
)

// Floating WhatsApp speed-dial: chat directly or open the WhatsApp Business catalog.
export default function WhatsAppFab() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const chat = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hola ${SITE.name}! Quisiera más información.`)}`
  return (
    <div className={`wa ${open ? 'open' : ''}`} ref={ref}>
      <div className="wa-menu" aria-hidden={!open} inert={!open}>
        <a href={chat} target="_blank" rel="noopener noreferrer">Chatear con Lumière</a>
        {SITE.catalogUrl && <a href={SITE.catalogUrl} target="_blank" rel="noopener noreferrer">Ver catálogo</a>}
      </div>
      <button className="wa-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Cerrar opciones de WhatsApp' : 'Abrir opciones de WhatsApp'}>
        {open ? <CloseIcon /> : <WaIcon />}
      </button>
    </div>
  )
}
