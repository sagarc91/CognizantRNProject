import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen'
import AddProductScreen from '../screens/AddProduct'

const Stack = createStackNavigator()

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Product" component={ProductScreen} options={{ title: 'Product Details' }} />
    <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Add Product' }} />
  </Stack.Navigator>
)

export default HomeStack
