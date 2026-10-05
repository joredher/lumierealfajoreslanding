import { useEffect, useRef } from 'react'
import Sun from './Sun'

// Top progress bar + sun that rotates with scroll + round "back to top" button with a progress ring.
export default function ScrollFX() {
  const topBtn = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    let raf = 0
    const update = () => {
      raf = 0
      const max = root.scrollHeight - window.innerHeight
      const y = window.scrollY
      root.style.setProperty('--scroll-y', y.toFixed(0))
      root.style.setProperty('--progress', max > 0 ? Math.min(y / max, 1).toFixed(4) : '0')
      topBtn.current?.classList.toggle('show', y > 500)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="scroll-bar" aria-hidden="true" />
      <button
        ref={topBtn}
        className="to-top"
        aria-label="Volver arriba"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="ring" viewBox="0 0 56 56" aria-hidden="true">
          <circle cx="28" cy="28" r="25" className="ring-bg" />
          <circle cx="28" cy="28" r="25" className="ring-fg" />
        </svg>
        <Sun className="to-top-sun" rays={12} />
      </button>
    </>
  )
}
