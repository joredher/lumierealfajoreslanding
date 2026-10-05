// ⚠️ Edit this file to personalise the site. Everything marked TODO is a placeholder.
export const SITE = {
  name: 'Lumière Artesanal',
  tagline: 'Alfajores argentinos hechos a mano',
  url: 'https://www.lumiereartesanal.com', // TODO: real domain
  whatsapp: '5490000000000', // TODO: country code + number, digits only (e.g. 5491155551234)
  email: 'hola@lumiereartesanal.com', // TODO
  instagram: 'lumiere.artesanal', // TODO
  city: 'Tu ciudad', // TODO
  currency: 'USD', // TODO
  locale: 'es-AR',
}

// Prices are placeholders. `image` is optional; without it a sun-motif illustration is shown.
export const PRODUCTS = [
  {
    id: 'alfajor-clasico',
    name: 'Alfajores de Maicena',
    badge: 'El favorito',
    desc: 'Tapitas suaves que se deshacen, rellenas de dulce de leche y rebozadas en coco rallado. La receta clásica argentina.',
    unit: 'caja x 6',
    price: 14,
  },
  {
    id: 'alfajor-chocolate',
    name: 'Alfajores de Chocolate',
    desc: 'Doble tapa de cacao, dulce de leche generoso y baño de chocolate semiamargo.',
    unit: 'caja x 6',
    price: 18,
  },
  {
    id: 'alfajor-surtido',
    name: 'Caja Surtida Lumière',
    badge: 'Para regalar',
    desc: 'Una selección de nuestros alfajores en caja de regalo. Ideal para sorprender.',
    unit: 'caja x 12',
    price: 32,
  },
  {
    id: 'rolls-canela',
    name: 'Rolls de Canela',
    desc: 'Masa esponjosa, canela y azúcar morena, recién horneados. Dulces y reconfortantes.',
    unit: 'caja x 4',
    price: 12,
  },
  {
    id: 'canelones',
    name: 'Canelones',
    desc: 'Nuestra versión artesanal, hecha por encargo con ingredientes frescos.',
    unit: 'bandeja x 6',
    price: 16,
  },
]

export const formatPrice = (n) =>
  new Intl.NumberFormat(SITE.locale, { style: 'currency', currency: SITE.currency, maximumFractionDigits: 0 }).format(n)
