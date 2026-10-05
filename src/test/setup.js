import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
  localStorage.clear()
  document.body.style.overflow = ''
})

// jsdom gaps used by the app
window.scrollTo = () => {}
Element.prototype.scrollTo = () => {}
