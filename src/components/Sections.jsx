import { SITE } from '../data/site'

export function About() {
  return (
    <section id="historia" className="section about">
      <h2>Nuestra historia</h2>
      {/* TODO: reemplazar con la historia real de la emprendedora */}
      <p>
        {SITE.name} nació en una cocina, con recetas de familia y la idea de compartir un pedacito de Argentina.
        Cada alfajor se prepara a mano, sin apuros, con dulce de leche de verdad y mucho amor por el oficio.
      </p>
    </section>
  )
}

export function HowTo() {
  const steps = [
    ['1', 'Elegí', 'Agregá tus productos favoritos al carrito.'],
    ['2', 'Confirmá', 'Dejá tu nombre y datos de entrega; te abrimos WhatsApp con el pedido listo.'],
    ['3', 'Disfrutá', 'Coordinamos el pago y la entrega, y recibís todo fresco.'],
  ]
  return (
    <section id="como-pedir" className="section">
      <h2>Cómo pedir</h2>
      <ol className="steps">
        {steps.map(([n, t, d]) => (
          <li key={n}>
            <span className="step-n">{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contacto" className="section contact">
      <h2>Hablemos</h2>
      <p>¿Pedidos para eventos, regalos o preguntas? Escribinos.</p>
      <div className="hero-cta">
        <a className="btn" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a className="btn btn-ghost" href={`mailto:${SITE.email}`}>{SITE.email}</a>
        <a className="btn btn-ghost" href={`https://instagram.com/${SITE.instagram}`} target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <img src="/logo.webp" alt="" width="56" height="56" />
      <p>© {new Date().getFullYear()} {SITE.name} · {SITE.tagline}</p>
    </footer>
  )
}
