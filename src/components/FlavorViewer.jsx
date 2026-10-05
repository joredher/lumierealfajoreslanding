import { useEffect, useRef, useState } from 'react'
import { FLAVORS } from '../data/site'
import { BoxIcon, ChevronIcon, CloseIcon, ZoomIcon } from './Icons'

// Full-screen flavour explorer: big photo with zoom, prev/next (buttons, arrows, swipe), thumbnails.
export default function FlavorViewer({ index, onClose, onNav, draft, boxFull, onAdd, onOpenBox }) {
  const [zoom, setZoom] = useState(null) // null | {x, y} in %
  const touchX = useRef(null)
  const open = index !== null
  const f = open ? FLAVORS[index] : null

  useEffect(() => setZoom(null), [index])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onNav(1)
      else if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onNav])

  if (!open) return null

  const pos = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }
  }
  const inBox = draft[f.id] || 0

  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label={f.name} style={{ '--tint': f.tint }}>
      <div className="viewer-backdrop" onClick={onClose} />
      <div className="viewer-card" key="card">
        <button className="icon-btn viewer-close" onClick={onClose} aria-label="Cerrar"><CloseIcon /></button>

        <div className="viewer-stage">
          <button className="nav-btn prev" onClick={() => onNav(-1)} aria-label="Sabor anterior"><ChevronIcon dir="left" /></button>
          <div
            className={`viewer-photo ${zoom ? 'zoomed' : ''}`}
            onClick={(e) => setZoom(zoom ? null : pos(e))}
            onMouseMove={(e) => zoom && setZoom(pos(e))}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null || zoom) return
              const dx = e.changedTouches[0].clientX - touchX.current
              if (Math.abs(dx) > 50) onNav(dx < 0 ? 1 : -1)
              touchX.current = null
            }}
          >
            <img
              key={f.id}
              src={f.image}
              alt={`Alfajor ${f.name}`}
              style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
              draggable="false"
            />
            <span className="zoom-hint"><ZoomIcon width="16" height="16" /> {zoom ? 'Toca para alejar' : 'Toca para acercar'}</span>
            {f.isNew && <span className="badge">Nuevo sabor ✨</span>}
          </div>
          <button className="nav-btn next" onClick={() => onNav(1)} aria-label="Sabor siguiente"><ChevronIcon /></button>
        </div>

        <div className="viewer-info" key={f.id}>
          <p className="eyebrow">{index + 1} / {FLAVORS.length}</p>
          <h3>{f.name}</h3>
          <p>{f.desc}</p>
          <ul className="tags">
            {f.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <div className="viewer-actions">
            <button className="btn" onClick={() => onAdd(f.id)} disabled={boxFull}>
              {boxFull ? `Tu caja está completa` : inBox ? `Agregar otro (${inBox} en tu caja)` : 'Agregar a mi caja'}
            </button>
            <button className="btn btn-ghost" onClick={onOpenBox}><BoxIcon width="18" height="18" /> Ver mi caja</button>
          </div>
        </div>

        <div className="thumbs" role="tablist" aria-label="Sabores">
          {FLAVORS.map((x, i) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={i === index}
              aria-label={x.name}
              className={i === index ? 'on' : ''}
              onClick={() => onNav(i - index)}
            >
              <img src={x.image} alt="" width="56" height="48" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
