import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import AccountScreen from './screens/AccountScreen'
import { StyleSheet } from 'react-native'
import { Tabs } from "./constants"
import { Provider } from 'react-redux'
import configureAppStore from './store'
import ProductScreen from './screens/ProductScreen'
import AddProductScreen from './screens/AddProduct'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FontWeight, Dimension } from './constants'
import { StatusBar } from 'react-native'

const store = configureAppStore()
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={Tabs.HOMESCREEN} component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Product" component={ProductScreen} />
    <Stack.Screen name="AddProduct" component={AddProductScreen} />
  </Stack.Navigator>
)

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Tab.Navigator>
          <Tab.Screen name={Tabs.HOMESCREEN} component={HomeStack} options={{
            headerShown: false, tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            )
          }} />
          <Tab.Screen name={Tabs.SEARCHSCREEN} component={SearchScreen} options={{headerShown: false, 
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" size={size} color={color} />
            ),
          }} />
          <Tab.Screen name={Tabs.ACCOUNTSCREEN} component={AccountScreen} options={{headerShown: false, 
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" size={size} color={color} />
            ),
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: Dimension.DIM9,
    paddingHorizontal: Dimension.DIM9,
  },
  sectionTitle: {
    fontSize: Dimension.DIM9,
    fontWeight: FontWeight.medium,
  },
  sectionDescription: {
    marginTop: Dimension.DIM5,
    fontSize: Dimension.DIM7,
    fontWeight: FontWeight.normal,
  },
  highlight: {
    fontWeight: FontWeight.bold,
  },
})

export default App
