export const SITE = {
  name: 'Lumière Artesanal',
  tagline: 'Alfajores artesanales en Yopal, Casanare',
  url: 'https://www.lumiereartesanal.com', // TODO: dominio real
  whatsapp: '573214659653',
  whatsappDisplay: '+57 321 465 9653',
  email: '', // TODO (opcional): si hay correo, se muestra en Contacto
  instagram: 'lumiere.artesanall',
  city: 'Yopal, Casanare',
  currency: 'COP',
  locale: 'es-CO',
}

export const BOX_SIZE = 4
export const BOX_PRICE = 25000

export const FLAVORS = [
  { id: 'tradicional', name: 'Arequipe tradicional', desc: 'Bizcocho de chocolate, arequipe y cobertura de chocolate con hilos blancos.' },
  { id: 'mora', name: 'Arequipe + mora', desc: 'Arequipe con mermelada de mora y crocante de maní por encima.' },
  { id: 'maracuya', name: 'Arequipe + maracuyá', desc: 'Arequipe con un toque ácido de maracuyá, cubierto de chocolate blanco.' },
  { id: 'lulo', name: 'Arequipe + lulo', desc: 'Arequipe y lulo, cobertura blanca con líneas de chocolate.' },
  { id: 'oreo', name: 'Arequipe Oreo', desc: 'Arequipe con galleta Oreo, cobertura de chocolate blanco.' },
  { id: 'redvelvet', name: 'Red Velvet', desc: 'Bizcocho red velvet con crema y cobertura blanca.' },
  { id: 'milo', name: 'Milo', desc: 'Sabor a Milo con arequipe y cobertura de chocolate.' },
  { id: 'nuez', name: 'Nuez', desc: 'Relleno de nueces con arequipe, cobertura de chocolate blanco.', isNew: true },
  { id: 'nucita', name: 'Nucita', desc: 'Relleno cremoso de Nucita, chocolate blanco y barquillo.', isNew: true },
].map((f) => ({ ...f, image: `/img/${f.id}.webp` }))

export const formatPrice = (n) =>
  new Intl.NumberFormat(SITE.locale, { style: 'currency', currency: SITE.currency, maximumFractionDigits: 0 }).format(n)
