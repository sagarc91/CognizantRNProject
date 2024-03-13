import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: number
}

interface ProductState {
  products: Product[]
}

const initialState: ProductState = {
  products: []
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
  },
})

export const { setProducts } = productSlice.actions

export const selectProducts = (state: { products: ProductState }) =>
  state.products.products

export default productSlice.reducer
