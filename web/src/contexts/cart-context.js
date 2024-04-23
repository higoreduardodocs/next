import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({})

export function CartContextProvider({ children }) {
  const ls = typeof window !== 'undefined' ? window.localStorage : null
  const [cartProducts, setCartProducts] = useState([])

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId])
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const position = cartProducts.indexOf(productId)
      if (position !== -1) {
        return prev.filter((_, i) => i !== position)
      }
    })
  }

  function clearCart() {
    setCartProducts([])
    ls?.removeItem('cart')
  }

  useEffect(() => {
    if (cartProducts?.length > 0)
      ls?.setItem('cart', JSON.stringify(cartProducts))
  }, [cartProducts])

  useEffect(() => {
    if (ls && ls.getItem('cart'))
      setCartProducts(JSON.parse(ls.getItem('cart')))
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
