import { SITE } from '../data/site'

export function About() {
  return (
    <section id="historia" className="section about">
      <img className="about-photo" src="/img/juliana.webp" alt="Juliana, la creadora de Lumière Artesanal, en su puesto de alfajores" width="320" height="320" loading="lazy" />
      <div>
        <h2>Hola, soy Juliana</h2>
        {/* TODO: reemplazar con la historia real de Juliana */}
        <p>
          Soy Juliana, y desde mi cocina en Yopal preparo cada alfajor a mano, con calma y mucho cariño.
          Lumière nació del deseo de compartir sabores que alegran el día: bizcocho suave, arequipe de verdad
          y combinaciones que te hacen volver por otro. Gracias por ser parte de esta historia. ✨
        </p>
        <p className="signature">Somos luz.</p>
      </div>
    </section>
  )
}

export function HowTo() {
  const steps = [
    ['1', 'Arma tu caja', 'Elige 4 sabores, los que quieras, por $25.000.'],
    ['2', 'Confirma', 'Déjanos tu nombre y datos de entrega; se abre WhatsApp con tu pedido listo.'],
    ['3', 'Disfruta', 'Coordinamos el pago y la entrega en Yopal, y recibes todo fresco.'],
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
      <p>¿Pedidos para eventos, regalos o preguntas? Escríbenos desde {SITE.city}.</p>
      <div className="hero-cta">
        <a className="btn" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsappDisplay}</a>
        <a className="btn btn-ghost" href={`https://www.instagram.com/${SITE.instagram}/`} target="_blank" rel="noopener noreferrer">Instagram @{SITE.instagram}</a>
        {SITE.email && <a className="btn btn-ghost" href={`mailto:${SITE.email}`}>{SITE.email}</a>}
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
