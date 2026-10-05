export const SITE = {
  name: 'Lumière Artesanal',
  tagline: 'Alfajores artesanales en Yopal, Casanare',
  // Set VITE_SITE_URL in .env.local (see .env.example). Used for canonical/OG/sitemap at build time.
  url: (import.meta.env.VITE_SITE_URL || 'https://www.lumiereartesanal.com').replace(/\/$/, ''),
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

// Photo files live in /public/img. Keyword file names + descriptive alt text + real dimensions.
const photo = (file, alt, width = 1200, height = 1000) => ({ image: `/img/${file}`, alt, width, height })

export const FLAVORS = [
  { id: 'tradicional', tint: '#F2C48D', tags: ['Bizcocho de chocolate', 'Arequipe', 'Cobertura de chocolate'], name: 'Arequipe tradicional', desc: 'Bizcocho de chocolate, arequipe y cobertura de chocolate con hilos blancos.',
    ...photo('alfajor-arequipe-tradicional.webp', 'Alfajor artesanal de arequipe tradicional con cobertura de chocolate, cortado por la mitad') },
  { id: 'mora', tint: '#E6A5B4', tags: ['Arequipe', 'Mermelada de mora', 'Crocante'], name: 'Arequipe + mora', desc: 'Arequipe con mermelada de mora y crocante de maní por encima.',
    ...photo('alfajor-arequipe-mora.webp', 'Alfajor artesanal de arequipe y mora con crocante, cortado por la mitad') },
  { id: 'maracuya', tint: '#F8DA7A', tags: ['Arequipe', 'Maracuyá', 'Chocolate blanco'], name: 'Arequipe + maracuyá', desc: 'Arequipe con un toque ácido de maracuyá, cubierto de chocolate blanco.',
    ...photo('alfajor-arequipe-maracuya.webp', 'Alfajor artesanal de arequipe y maracuyá con chocolate blanco, cortado por la mitad') },
  { id: 'lulo', tint: '#D9E3A2', tags: ['Arequipe', 'Lulo', 'Chocolate blanco'], name: 'Arequipe + lulo', desc: 'Arequipe y lulo, cobertura blanca con líneas de chocolate.',
    ...photo('alfajor-arequipe-lulo.webp', 'Alfajor artesanal de arequipe y lulo con cobertura blanca, cortado por la mitad') },
  { id: 'oreo', tint: '#D8D2CB', tags: ['Arequipe', 'Galleta Oreo', 'Chocolate blanco'], name: 'Arequipe Oreo', desc: 'Arequipe con galleta Oreo, cobertura de chocolate blanco.',
    ...photo('alfajor-arequipe-oreo.webp', 'Alfajor artesanal de arequipe con galleta Oreo y chocolate blanco, cortado por la mitad') },
  { id: 'redvelvet', tint: '#F0A9A9', tags: ['Bizcocho red velvet', 'Crema', 'Chocolate blanco'], name: 'Red Velvet', desc: 'Bizcocho red velvet con crema y cobertura blanca.',
    ...photo('alfajor-red-velvet.webp', 'Alfajor artesanal red velvet con crema y chocolate blanco, cortado por la mitad') },
  { id: 'milo', tint: '#DDB48C', tags: ['Milo', 'Arequipe', 'Cobertura de chocolate'], name: 'Milo', desc: 'Sabor a Milo con arequipe y cobertura de chocolate.',
    ...photo('alfajor-milo.webp', 'Alfajor artesanal de Milo con arequipe y cobertura de chocolate', 810, 675) },
  { id: 'nuez', tint: '#EBD3A8', tags: ['Nueces', 'Arequipe', 'Chocolate blanco'], name: 'Nuez', desc: 'Relleno de nueces con arequipe, cobertura de chocolate blanco.', isNew: true,
    ...photo('alfajor-nuez.webp', 'Alfajor artesanal de nuez con arequipe y chocolate blanco', 810, 675) },
  { id: 'nucita', tint: '#F0D9BD', tags: ['Nucita', 'Barquillo', 'Chocolate blanco'], name: 'Nucita', desc: 'Relleno cremoso de Nucita, chocolate blanco y barquillo.', isNew: true,
    ...photo('alfajor-nucita.webp', 'Alfajor artesanal de Nucita con chocolate blanco y barquillo', 810, 675) },
]

// Rolls de canela: se venden por catálogo de WhatsApp. TODO: agregar precios.
export const ROLLS = {
  name: 'Rolls de canela',
  desc: 'Esponjosos, con canela y azúcar, recién horneados. Mira el catálogo y pide por WhatsApp.',
  ...photo('rolls-de-canela-yopal.webp', 'Roll de canela con glaseado en su empaque, hecho en Yopal', 700, 700),
}

export const IMAGES = {
  logo: { src: '/img/lumiere-artesanal-logo.webp', alt: 'Logo de Lumière Artesanal: sol artesanal con ornamentos', width: 640, height: 640 },
  juliana: { src: '/img/juliana-creadora-lumiere-artesanal.webp', alt: 'Juliana, creadora de Lumière Artesanal, en su puesto de alfajores artesanales', width: 640, height: 640 },
}

export const formatPrice = (n) =>
  new Intl.NumberFormat(SITE.locale, { style: 'currency', currency: SITE.currency, maximumFractionDigits: 0 }).format(n)
