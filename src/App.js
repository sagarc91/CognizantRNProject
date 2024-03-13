import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import AccountScreen from './screens/AccountScreen'
import { StyleSheet } from 'react-native'
import { Tabs } from "./constants"

const Tab = createBottomTabNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={Tabs.HOMESCREEN} component={HomeScreen} />
        <Tab.Screen name={Tabs.SEARCHSCREEN} component={SearchScreen} />
        <Tab.Screen name={Tabs.ACCOUNTSCREEN} component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>

  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
})

export default App
