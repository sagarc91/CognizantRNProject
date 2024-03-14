import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from './HomeStack'
import SearchScreen from '../screens/SearchScreen'
import AccountScreen from '../screens/AccountScreen'
import { Colors } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { NativeModules } from 'react-native'
import en from '../locales/en.json'
import fr from '../locales/fr.json'
import 'intl-pluralrules'

i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      fr: { translation: fr }
    },
    fallbackLng: 'en', // Fallback language if translation for current locale is not available
    interpolation: {
      escapeValue: false 
    }
  })
  
  const deviceLocale = NativeModules.I18nManager.localeIdentifier
  i18n.changeLanguage(deviceLocale)

const Tab = createBottomTabNavigator()

const TabNavigator = () => (
  <Tab.Navigator tabBarOptions={{ activeTintColor: Colors.primary }}>
    <Tab.Screen
      name={i18n.t('home')}
      component={HomeStack}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name={i18n.t('search')}
      component={SearchScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Icon name="search" size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name={i18n.t('account')}
      component={AccountScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Icon name="user" size={size} color={color} />,
      }}
    />
  </Tab.Navigator>
)

export default TabNavigator
