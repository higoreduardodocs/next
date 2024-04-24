import { configureStore } from '@reduxjs/toolkit'

import cartSlice from './reducers/cart-slice'

export default configureStore({
  reducer: {
    cart: cartSlice,
  },
})
