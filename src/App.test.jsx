import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App.jsx'
import { resetInitialOrder } from './orderStore.js'

const MIN = 60 * 1000
const user = () => userEvent.setup()
const openBuilder = (u) => u.click(screen.getByRole('button', { name: 'Arma tu caja de alfajores' }))
const builder = () => screen.getByRole('dialog', { name: 'Arma tu caja' })
const cart = () => screen.getByRole('dialog', { name: 'Mi pedido' })
const add = (u, f) => u.click(within(builder()).getByRole('button', { name: `Agregar ${f}` }))

// mode: 'Caja de 4' | 'Sueltos'   size: 'mini' | 'grande'
async function fillOrder(u, mode, size, flavours) {
  await openBuilder(u)
  await u.click(within(builder()).getByRole('radio', { name: mode === 'Caja de 4' ? /^Caja de 4$/ : /^Sueltos/ }))
  await u.click(within(builder()).getByRole('radio', { name: new RegExp('^' + size, 'i') }))
  for (const f of flavours) await add(u, f)
}
const fillBox = (u, size, flavours) => fillOrder(u, 'Caja de 4', size, flavours)
const fillLoose = (u, size, flavours) => fillOrder(u, 'Sueltos', size, flavours)

beforeEach(() => {
  localStorage.clear()
  resetInitialOrder()
  window.open = vi.fn()
})

describe('page basics', () => {
  it('has exactly one h1 and every image has alt text', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    for (const img of document.images) expect(img).toHaveAttribute('alt')
  })

  it('shows the 9 flavours and the box and single prices', () => {
    render(<App />)
    expect(screen.getAllByRole('article')).toHaveLength(9)
    expect(screen.getAllByText(/15\.000/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/25\.000/).length).toBeGreaterThan(0)
    expect(screen.getByText(/pedirlos sueltos \(mínimo 2\)/)).toBeInTheDocument()
  })
})

describe('building a box of 4', () => {
  it('needs exactly 4 flavours before the box can be added', async () => {
    const u = user()
    render(<App />)
    await fillBox(u, 'mini', ['Arequipe tradicional', 'Arequipe + mora', 'Milo'])
    expect(within(builder()).getByRole('button', { name: /Faltan 1 sabor/ })).toBeDisabled()
    await add(u, 'Nuez')
    expect(within(builder()).getByRole('button', { name: /Agregar caja mini/ })).toBeEnabled()
  })

  it('does not allow more than 4 flavours in a box', async () => {
    const u = user()
    render(<App />)
    await fillBox(u, 'grande', ['Milo', 'Milo', 'Milo', 'Milo'])
    expect(within(builder()).getByRole('button', { name: 'Agregar Nuez' })).toBeDisabled()
  })

  it('mini box costs 15.000 and appears in the cart with a badge', async () => {
    const u = user()
    render(<App />)
    await fillBox(u, 'mini', ['Arequipe tradicional', 'Arequipe + mora', 'Milo', 'Nuez'])
    await u.click(within(builder()).getByRole('button', { name: /Agregar caja mini · .*15\.000/ }))
    const c = cart()
    expect(within(c).getByText(/Caja de 4 · Mini/)).toBeInTheDocument()
    expect(c.querySelector('.totals .total')).toHaveTextContent(/15\.000/)
    expect(screen.getByRole('button', { name: /Abrir mi pedido, 1 artículo/ })).toBeInTheDocument()
  })

  it('mixed sizes add up: mini + grande = 40.000', async () => {
    const u = user()
    render(<App />)
    await fillBox(u, 'mini', ['Milo', 'Milo', 'Milo', 'Milo'])
    await u.click(within(builder()).getByRole('button', { name: /Agregar caja mini/ }))
    await u.click(within(cart()).getByRole('button', { name: '+ Agregar más' }))
    await fillBox(u, 'grande', ['Nuez', 'Nuez', 'Nucita', 'Nucita'])
    await u.click(within(builder()).getByRole('button', { name: /Agregar caja grande/ }))
    expect(cart().querySelector('.totals .total')).toHaveTextContent(/40\.000/)
    expect(within(cart()).getAllByText(/^Caja de 4 · /)).toHaveLength(2)
  })
})

describe('loose alfajores (minimum 2)', () => {
  it('cannot be added with 0 or 1 alfajor, can with 2', async () => {
    const u = user()
    render(<App />)
    await fillLoose(u, 'grande', [])
    expect(within(builder()).getByRole('button', { name: 'Elige al menos 2 alfajores' })).toBeDisabled()
    await add(u, 'Milo')
    expect(within(builder()).getByRole('button', { name: /Falta 1 alfajor para el mínimo/ })).toBeDisabled()
    await add(u, 'Nuez')
    expect(within(builder()).getByRole('button', { name: /Agregar 2 alfajores grandes · .*14\.000/ })).toBeEnabled()
  })

  it('prices big ones at 7.000 each and mini ones at 4.000 each', async () => {
    const u = user()
    render(<App />)
    await fillLoose(u, 'grande', ['Milo', 'Nuez', 'Nucita'])
    await u.click(within(builder()).getByRole('button', { name: /Agregar 3 alfajores grandes · .*21\.000/ }))
    expect(within(cart()).getByText(/3 alfajores sueltos · Grande/)).toBeInTheDocument()

    await u.click(within(cart()).getByRole('button', { name: '+ Agregar más' }))
    await fillLoose(u, 'mini', ['Red Velvet', 'Red Velvet', 'Milo'])
    await u.click(within(builder()).getByRole('button', { name: /Agregar 3 alfajores minis · .*12\.000/ }))
    expect(cart().querySelector('.totals .total')).toHaveTextContent(/33\.000/) // 21.000 + 12.000
  })

  it('is not limited to 4 (up to 24) and shows a running total', async () => {
    const u = user()
    render(<App />)
    await fillLoose(u, 'mini', ['Milo', 'Milo', 'Milo', 'Milo', 'Milo', 'Milo'])
    expect(builder().querySelector('.loose-total')).toHaveTextContent(/6 alfajores.*24.000/)
    expect(within(builder()).getByRole('button', { name: /Agregar 6 alfajores minis · .*24\.000/ })).toBeEnabled()
    expect(within(builder()).getByRole('button', { name: 'Agregar Nuez' })).toBeEnabled()
  })

  it('suggests the box when 4 loose big ones cost more than the box', async () => {
    const u = user()
    render(<App />)
    await fillLoose(u, 'grande', ['Milo', 'Milo', 'Nuez', 'Nuez'])
    expect(within(builder()).getByText(/cuesta .*25\.000, menos que 4 sueltos/)).toBeInTheDocument()
    await u.click(within(builder()).getByRole('button', { name: 'Cambiar a caja' }))
    expect(within(builder()).getByRole('button', { name: /Agregar caja grande/ })).toBeEnabled()
  })

  it('switching to a box with more than 4 chosen starts the selection over', async () => {
    const u = user()
    render(<App />)
    await fillLoose(u, 'grande', ['Milo', 'Milo', 'Milo', 'Milo', 'Milo'])
    await u.click(within(builder()).getByRole('radio', { name: /^Caja de 4$/ }))
    expect(within(builder()).getByRole('button', { name: /Faltan 4 sabores/ })).toBeDisabled()
  })
})

describe('delivery fee', () => {
  async function boxInCart(u) {
    await fillBox(u, 'mini', ['Milo', 'Milo', 'Milo', 'Milo'])
    await u.click(within(builder()).getByRole('button', { name: /Agregar caja mini/ }))
  }

  it('pickup has no fee', async () => {
    const u = user()
    render(<App />)
    await boxInCart(u)
    expect(within(cart()).queryByText('Domicilio')).not.toBeInTheDocument()
    expect(cart().querySelector('.totals .total')).toHaveTextContent(/15\.000/)
  })

  it('domicilio adds 7.000 to the total and to the WhatsApp message', async () => {
    const u = user()
    render(<App />)
    await boxInCart(u)
    await u.selectOptions(within(cart()).getByLabelText(/^Entrega/), 'envio')
    expect(within(cart()).getByText('Domicilio')).toBeInTheDocument()
    expect(cart().querySelector('.totals .total')).toHaveTextContent(/22\.000/) // 15.000 + 7.000

    await u.type(within(cart()).getByLabelText('Nombre'), 'Ana')
    await u.type(within(cart()).getByLabelText('Teléfono'), '3001234567')
    await u.type(within(cart()).getByLabelText('Dirección'), 'Calle 10 # 5-20')
    await u.click(within(cart()).getByRole('button', { name: 'Enviar pedido por WhatsApp' }))
    const text = new URL(window.open.mock.calls[0][0]).searchParams.get('text')
    expect(text).toMatch(/Subtotal: .*15\.000/)
    expect(text).toMatch(/Domicilio: .*7\.000/)
    expect(text).toMatch(/Total: .*22\.000/)
    expect(text).toContain('Calle 10 # 5-20')
  })

  it('the fee is charged once per order, not per item', async () => {
    const u = user()
    render(<App />)
    await boxInCart(u)
    await u.click(within(cart()).getByRole('button', { name: '+ Agregar más' }))
    await fillLoose(u, 'grande', ['Nuez', 'Nucita'])
    await u.click(within(builder()).getByRole('button', { name: /Agregar 2 alfajores grandes/ }))
    await u.selectOptions(within(cart()).getByLabelText(/^Entrega/), 'envio')
    expect(cart().querySelector('.totals .total')).toHaveTextContent(/36\.000/) // 15.000 + 14.000 + 7.000
  })
})

describe('sending the order', () => {
  it('opens WhatsApp with the full order and then empties the cart', async () => {
    const u = user()
    render(<App />)
    await fillBox(u, 'mini', ['Arequipe tradicional', 'Arequipe tradicional', 'Red Velvet', 'Nucita'])
    await u.click(within(builder()).getByRole('button', { name: /Agregar caja mini/ }))
    await u.type(within(cart()).getByLabelText('Nombre'), 'Ana')
    await u.type(within(cart()).getByLabelText('Teléfono'), '3001234567')
    await u.click(within(cart()).getByRole('button', { name: 'Enviar pedido por WhatsApp' }))

    expect(window.open).toHaveBeenCalledOnce()
    const url = new URL(window.open.mock.calls[0][0])
    expect(url.origin + url.pathname).toBe('https://wa.me/573144171683')
    const text = url.searchParams.get('text')
    expect(text).toContain('MINI')
    expect(text).toContain('2 x Arequipe tradicional')
    expect(text).toContain('1 x Red Velvet')
    expect(text).toContain('Nombre: Ana')
    expect(text).toContain('Recogida en persona')
    expect(text).toMatch(/Total: .*15\.000/)
    expect(screen.queryByRole('button', { name: /Abrir mi pedido, 1/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument() // sending is not an "expiry"
  })

  it('describes loose alfajores in the message', async () => {
    const u = user()
    render(<App />)
    await fillLoose(u, 'grande', ['Nuez', 'Nucita'])
    await u.click(within(builder()).getByRole('button', { name: /Agregar 2 alfajores grandes/ }))
    await u.type(within(cart()).getByLabelText('Nombre'), 'Luis')
    await u.type(within(cart()).getByLabelText('Teléfono'), '3109999999')
    await u.click(within(cart()).getByRole('button', { name: 'Enviar pedido por WhatsApp' }))
    const text = new URL(window.open.mock.calls[0][0]).searchParams.get('text')
    expect(text).toContain('2 ALFAJORES SUELTOS GRANDE')
    expect(text).toContain('1 x Nuez')
    expect(text).toMatch(/Total: .*14\.000/)
  })
})

describe('flavour viewer', () => {
  it('opens from a photo, navigates with the arrows and closes with Escape', async () => {
    const u = user()
    render(<App />)
    await u.click(screen.getByRole('button', { name: 'Ver Arequipe tradicional de cerca' }))
    const viewer = screen.getByRole('dialog', { name: 'Arequipe tradicional' })
    expect(within(viewer).getByRole('heading', { name: 'Arequipe tradicional' })).toBeInTheDocument()
    await u.keyboard('{ArrowRight}')
    expect(screen.getByRole('dialog', { name: 'Arequipe + mora' })).toBeInTheDocument()
    await u.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: 'Arequipe + mora' })).not.toBeInTheDocument()
  })
})

describe('15-minute reset', () => {
  it('on screen: selection is wiped and the modal explains it', async () => {
    const u = user()
    render(<App />)
    await u.click(screen.getAllByRole('button', { name: 'Agregar a mi pedido' })[0])
    expect(screen.getByText(/1\/4 elegidos/)).toBeInTheDocument()

    localStorage.setItem('lumiere-order-ts', String(Date.now() - 16 * MIN))
    act(() => {
      window.dispatchEvent(new Event('focus'))
    })

    const modal = await screen.findByRole('alertdialog', { name: 'Tu selección expiró' })
    expect(modal).toHaveTextContent(/vuelve a elegir tus alfajores/i)
    expect(screen.queryByText(/1\/4 elegidos/)).not.toBeInTheDocument()
    expect(localStorage.getItem('lumiere-order-ts')).toBeNull()
    await u.click(within(modal).getByRole('button', { name: 'Elegir mis alfajores' }))
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(builder()).toBeInTheDocument()
  })

  it('does not reset before 15 minutes', async () => {
    const u = user()
    render(<App />)
    await u.click(screen.getAllByRole('button', { name: 'Agregar a mi pedido' })[0])
    localStorage.setItem('lumiere-order-ts', String(Date.now() - 10 * MIN))
    act(() => {
      window.dispatchEvent(new Event('focus'))
    })
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(screen.getByText(/1\/4 elegidos/)).toBeInTheDocument()
  })

  it('on return: an order left 16 minutes ago is gone and the modal shows', () => {
    localStorage.setItem('lumiere-cart-v2', JSON.stringify([{ uid: 'a', kind: 'box', size: 'mini', flavors: { mora: 4 } }]))
    localStorage.setItem('lumiere-order-ts', String(Date.now() - 16 * MIN))
    render(<App />)
    expect(screen.getByRole('alertdialog', { name: 'Tu selección expiró' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Abrir mi pedido, 0 artículos/ })).toBeInTheDocument()
  })

  it('on return: an order from 5 minutes ago is kept (including old carts without "kind")', () => {
    localStorage.setItem('lumiere-cart-v2', JSON.stringify([{ uid: 'a', size: 'grande', flavors: { oreo: 4 } }]))
    localStorage.setItem('lumiere-order-ts', String(Date.now() - 5 * MIN))
    render(<App />)
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Abrir mi pedido, 1 artículo/ })).toBeInTheDocument()
  })
})
