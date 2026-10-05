import { useEffect, useReducer } from 'react'

const KEY = 'lumiere-cart'

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, [action.id]: (state[action.id] || 0) + 1 }
    case 'set': {
      const next = { ...state }
      if (action.qty <= 0) delete next[action.id]
      else next[action.id] = action.qty
      return next
    }
    case 'clear':
      return {}
    default:
      return state
  }
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

export function useCart() {
  const [items, dispatch] = useReducer(reducer, undefined, load)
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      /* private mode: cart just won't persist */
    }
  }, [items])
  return {
    items,
    count: Object.values(items).reduce((a, b) => a + b, 0),
    add: (id) => dispatch({ type: 'add', id }),
    set: (id, qty) => dispatch({ type: 'set', id, qty }),
    clear: () => dispatch({ type: 'clear' }),
  }
}
