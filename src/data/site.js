export const SITE = {
  name: 'Lumière Artesanal',
  tagline: 'Alfajores artesanales en Yopal, Casanare',
  url: 'https://www.lumiereartesanal.com', // TODO: dominio real
  whatsapp: '573214659653',
  whatsappDisplay: '+57 321 465 9653',
  catalogUrl: 'https://wa.me/c/573144171683', // catálogo de WhatsApp Business
  email: '', // TODO (opcional): si hay correo, se muestra en Contacto
  instagram: 'lumiere.artesanall',
  city: 'Yopal, Casanare',
  currency: 'COP',
  locale: 'es-CO',
}

export const BOX_SIZE = 4

// Caja de 4 alfajores: el precio depende del tamaño.
export const SIZES = [
  { id: 'mini', label: 'Mini', price: 15000, note: 'Tamaño pequeño, perfectos para probar' },
  { id: 'grande', label: 'Grande', price: 25000, note: 'Tamaño grande, el clásico' },
]
export const DEFAULT_SIZE = 'grande'
export const sizeOf = (id) => SIZES.find((s) => s.id === id) ?? SIZES.find((s) => s.id === DEFAULT_SIZE)

export const FLAVORS = [
  { id: 'tradicional', tint: '#F2C48D', tags: ['Bizcocho de chocolate', 'Arequipe', 'Cobertura de chocolate'], name: 'Arequipe tradicional', desc: 'Bizcocho de chocolate, arequipe y cobertura de chocolate con hilos blancos.' },
  { id: 'mora', tint: '#E6A5B4', tags: ['Arequipe', 'Mermelada de mora', 'Crocante'], name: 'Arequipe + mora', desc: 'Arequipe con mermelada de mora y crocante de maní por encima.' },
  { id: 'maracuya', tint: '#F8DA7A', tags: ['Arequipe', 'Maracuyá', 'Chocolate blanco'], name: 'Arequipe + maracuyá', desc: 'Arequipe con un toque ácido de maracuyá, cubierto de chocolate blanco.' },
  { id: 'lulo', tint: '#D9E3A2', tags: ['Arequipe', 'Lulo', 'Chocolate blanco'], name: 'Arequipe + lulo', desc: 'Arequipe y lulo, cobertura blanca con líneas de chocolate.' },
  { id: 'oreo', tint: '#D8D2CB', tags: ['Arequipe', 'Galleta Oreo', 'Chocolate blanco'], name: 'Arequipe Oreo', desc: 'Arequipe con galleta Oreo, cobertura de chocolate blanco.' },
  { id: 'redvelvet', tint: '#F0A9A9', tags: ['Bizcocho red velvet', 'Crema', 'Chocolate blanco'], name: 'Red Velvet', desc: 'Bizcocho red velvet con crema y cobertura blanca.' },
  { id: 'milo', tint: '#DDB48C', tags: ['Milo', 'Arequipe', 'Cobertura de chocolate'], name: 'Milo', desc: 'Sabor a Milo con arequipe y cobertura de chocolate.' },
  { id: 'nuez', tint: '#EBD3A8', tags: ['Nueces', 'Arequipe', 'Chocolate blanco'], name: 'Nuez', desc: 'Relleno de nueces con arequipe, cobertura de chocolate blanco.', isNew: true },
  { id: 'nucita', tint: '#F0D9BD', tags: ['Nucita', 'Barquillo', 'Chocolate blanco'], name: 'Nucita', desc: 'Relleno cremoso de Nucita, chocolate blanco y barquillo.', isNew: true },
].map((f) => ({ ...f, image: `/img/${f.id}.webp` }))

// Rolls de canela: se venden por catálogo de WhatsApp. TODO: agregar precios.
export const ROLLS = {
  name: 'Rolls de canela',
  desc: 'Esponjosos, con canela y azúcar, recién horneados. Mira el catálogo y pide por WhatsApp.',
  image: '/img/rolls.webp',
}

export const formatPrice = (n) =>
  new Intl.NumberFormat(SITE.locale, { style: 'currency', currency: SITE.currency, maximumFractionDigits: 0 }).format(n)
