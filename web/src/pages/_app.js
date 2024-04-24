import { Provider } from 'react-redux'

import store from '@/store'
import Header from '@/components/navigation/header'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  )
}
