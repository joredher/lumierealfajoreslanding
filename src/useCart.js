import { useEffect, useReducer } from 'react'
import { CART_KEY, getInitialOrder } from './orderStore'

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

export function useCart() {
  const [boxes, dispatch] = useReducer(reducer, undefined, () => getInitialOrder().boxes)
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(boxes))
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
