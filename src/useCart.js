import { useEffect, useReducer } from 'react'

const KEY = 'lumiere-cart-v2'

// Cart = list of boxes. Each box: { uid, size: 'mini' | 'grande', flavors: { [flavorId]: qty } }
function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { uid: crypto.randomUUID(), size: action.size, flavors: action.flavors }]
    case 'remove':
      return state.filter((b) => b.uid !== action.uid)
    case 'clear':
      return []
    default:
      return state
  }
}

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(v) ? v : []
  } catch {
    return []
  }
}

export function useCart() {
  const [boxes, dispatch] = useReducer(reducer, undefined, load)
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(boxes))
    } catch {
      /* private mode: cart just won't persist */
    }
  }, [boxes])
  return {
    boxes,
    add: (flavors, size) => dispatch({ type: 'add', flavors, size }),
    remove: (uid) => dispatch({ type: 'remove', uid }),
    clear: () => dispatch({ type: 'clear' }),
  }
}
