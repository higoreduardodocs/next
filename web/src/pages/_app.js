import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { CartContextProvider } from '@/contexts/cart-context'
import Header from '@/components/navigation/header'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <ToastContainer />
      <Header />
      <Component {...pageProps} />
    </CartContextProvider>
  )
}
