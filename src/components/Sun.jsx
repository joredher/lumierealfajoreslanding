// Decorative sun inspired by the logo
export default function Sun({ className = '', rays = 16 }) {
  const petals = Array.from({ length: rays }, (_, i) => (
    <path
      key={i}
      d="M0 -62 C14 -78 14 -100 0 -118 C-14 -100 -14 -78 0 -62Z"
      transform={`rotate(${(360 / rays) * i})`}
      fill={i % 2 ? '#F5A623' : '#EE7F13'}
      stroke="#8A2A10"
      strokeWidth="2"
    />
  ))
  return (
    <svg className={className} viewBox="-125 -125 250 250" aria-hidden="true">
      {petals}
      <circle r="60" fill="#FFF3D6" stroke="#8A2A10" strokeWidth="3" />
    </svg>
  )
}
