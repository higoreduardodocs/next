import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { CartContextProvider } from '@/contexts/cart-context'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </CartContextProvider>
  )
}
