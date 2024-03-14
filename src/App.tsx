import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import configureAppStore from './store'
import TabNavigator from './navigators/TabNavigator'

const store = configureAppStore()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App
