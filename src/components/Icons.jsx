const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const BagIcon = (p) => (
  <svg {...base} {...p}><path d="M5 8h14l-1.2 12H6.2L5 8Z" /><path d="M9 8V7a3 3 0 0 1 6 0v1" /></svg>
)
export const CloseIcon = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const TrashIcon = (p) => (
  <svg {...base} {...p}><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>
)
export const ChevronIcon = ({ dir = 'right', ...p }) => (
  <svg {...base} {...p}><path d={dir === 'right' ? 'm9 5 7 7-7 7' : 'm15 5-7 7 7 7'} /></svg>
)
export const BoxIcon = (p) => (
  <svg {...base} {...p}><path d="M3 8l9-4 9 4-9 4-9-4Z" /><path d="M3 8v8l9 4 9-4V8M12 12v8" /></svg>
)
export const ZoomIcon = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5M11 8v6M8 11h6" /></svg>
)
