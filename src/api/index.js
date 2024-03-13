import { ApiCall } from '../constants'

export const fetchProducts = async () => {
    try {
      const response = await fetch(ApiCall.FETCH_PRODUCTS)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error ::', error)
      return []
    }
  }