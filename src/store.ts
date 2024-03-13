import { configureStore } from '@reduxjs/toolkit'
import productReducer from './redux/productSlice'
import Reactotron from './Reactotron'

export default function configureAppStore() {
  let middleware = []

  // if (__DEV__) {
  //   if (Reactotron.createEnhancer) {
  //     middleware.push(Reactotron.createEnhancer())
  //   }
  // }

  const store = configureStore({
    reducer: {
      products: productReducer,
    },
    devTools: true,
  })

  return store
}