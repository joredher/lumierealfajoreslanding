import { ROLLS, SIZES, SITE, formatPrice } from '../data/site'
import Reveal from './Reveal'
import Sun from './Sun'

export function Rolls() {
  const waText = encodeURIComponent(`Hola ${SITE.name}! Quiero información sobre los rolls de canela.`)
  return (
    <section id="rolls" className="section rolls">
      <Reveal className="rolls-art">
        {ROLLS.image ? <img src={ROLLS.image} alt={ROLLS.name} loading="lazy" /> : <Sun className="rolls-sun" rays={12} />}
      </Reveal>
      <Reveal delay={120}>
        <h2 className="h-deco left">{ROLLS.name}</h2>
        <p>{ROLLS.desc}</p>
        <div className="hero-cta">
          {SITE.catalogUrl && (
            <a className="btn" href={SITE.catalogUrl} target="_blank" rel="noopener noreferrer">Ver catálogo en WhatsApp</a>
          )}
          <a className={`btn ${SITE.catalogUrl ? 'btn-ghost' : ''}`} href={`https://wa.me/${SITE.whatsapp}?text=${waText}`} target="_blank" rel="noopener noreferrer">Pedir rolls</a>
        </div>
      </Reveal>
    </section>
  )
}

export function About() {
  return (
    <section id="historia" className="section about">
      <Reveal as="img" className="about-photo" src="/img/juliana.webp" alt="Juliana, la creadora de Lumière Artesanal, en su puesto de alfajores" width="320" height="320" loading="lazy" />
      <Reveal delay={150}>
        <h2 className="h-deco left">Hola, soy Juliana</h2>
        {/* TODO: reemplazar con la historia real de Juliana */}
        <p>
          Soy Juliana, y desde mi cocina en Yopal preparo cada alfajor a mano, con calma y mucho cariño.
          Lumière nació del deseo de compartir sabores que alegran el día: bizcocho suave, arequipe de verdad
          y combinaciones que te hacen volver por otro. Gracias por ser parte de esta historia. ✨
        </p>
        <p className="signature">Somos luz.</p>
      </Reveal>
    </section>
  )
}

export function HowTo() {
  const steps = [
    ['1', 'Arma tu caja', `Elige el tamaño (${SIZES.map((s) => `${s.label.toLowerCase()} ${formatPrice(s.price)}`).join(' o ')}) y 4 sabores, los que quieras.`],
    ['2', 'Confirma', 'Déjanos tu nombre y datos de entrega; se abre WhatsApp con tu pedido listo.'],
    ['3', 'Disfruta', 'Coordinamos el pago y la entrega en Yopal, y recibes todo fresco.'],
  ]
  return (
    <section id="como-pedir" className="section">
      <Reveal as="h2" className="h-deco">Cómo pedir</Reveal>
      <ol className="steps">
        {steps.map(([n, t, d], i) => (
          <Reveal as="li" key={n} delay={i * 130}>
            <span className="step-n">{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contacto" className="section contact">
      <Reveal as="h2" className="h-deco">Hablemos</Reveal>
      <Reveal as="p" delay={80}>¿Pedidos para eventos, regalos o preguntas? Escríbenos desde {SITE.city}.</Reveal>
      <Reveal className="hero-cta" delay={160}>
        <a className="btn" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsappDisplay}</a>
        <a className="btn btn-ghost" href={`https://www.instagram.com/${SITE.instagram}/`} target="_blank" rel="noopener noreferrer">Instagram @{SITE.instagram}</a>
        {SITE.email && <a className="btn btn-ghost" href={`mailto:${SITE.email}`}>{SITE.email}</a>}
      </Reveal>
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
