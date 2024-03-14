import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import * as Keychain from 'react-native-keychain'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/CustomButton'
import { Colors, ButtonTitles, Dimension, Spacing } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'

interface UserInfo {
  username: string
}

const AccountScreen: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await AsyncStorage.getItem('isLoggedIn')
      if (loginStatus === 'true') {
        const credentials = await Keychain.getGenericPassword()
        if (credentials && credentials.username) {
          setIsLoggedIn(true)
          const userDetails: UserInfo = { username: credentials.username }
          setUserInfo(userDetails)
        }
      }
    }

    checkLoginStatus()
  }, [])

  const handleLogin = async () => {
    const isValid = true

    if (isValid) {
      await Keychain.setGenericPassword(username, password)
      setIsLoggedIn(true)
      const userDetails: UserInfo = { username }
      setUserInfo(userDetails)
      await AsyncStorage.setItem('isLoggedIn', 'true')
    } else {
      // here we can show invalid credentials login, we can show pop-up
    }
  }

  const handleLogout = async () => {
    await Keychain.resetGenericPassword()
    setIsLoggedIn(false)
    setUserInfo(null)
    await AsyncStorage.removeItem('isLoggedIn')
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Icon name="university" size={100} color={Colors.primary} style={styles.logoIcon} />
      </View>
      <View style={styles.card}>
        <Text style={styles.heading}>{!isLoggedIn ? 'Login' : 'Welcome back'}</Text>
        {isLoggedIn ? (
          <View style={{ justifyContent: 'center' }}>
            <View style={styles.iconContainer}>
              <Icon name="user" size={200} color={Colors.black} style={styles.icon} />
            </View>
            <Text style={styles.welcomeText}>Hi, {userInfo && userInfo.username}!</Text>
            <Button title={ButtonTitles.LOGOUT} onPress={handleLogout} />
          </View>
        ) : (
          <View>
            <View style={styles.inputContainer}>
              <Icon name="user" size={20} color={Colors.gray} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color={Colors.gray} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <Button title={ButtonTitles.LOGIN} onPress={handleLogin} />
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: Dimension.DIM2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Dimension.DIM4,
  },
  logoIcon: {
    marginBottom: Dimension.DIM6,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Dimension.DIM6,
    padding: Dimension.DIM8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: Dimension.DIM1,
      height: Dimension.DIM2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
  },
  heading: {
    fontSize: Dimension.DIM9,
    fontWeight: 'bold',
    marginBottom: Dimension.DIM8,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.gray,
    borderRadius: Dimension.DIM4,
    borderWidth: Dimension.DIM2,
    marginBottom: Dimension.DIM4,
    paddingHorizontal: Dimension.DIM2,
  },
  icon: {
    marginHorizontal: Dimension.DIM5,
  },
  input: {
    flex: Dimension.DIM2,
    height: Spacing.buttonHeight,
    paddingHorizontal: Dimension.DIM4,
  },
  welcomeText: {
    fontSize: Dimension.DIM7,
    textAlign: 'center',
    marginBottom: Dimension.DIM4,
  },
  iconContainer: {
    alignItems: 'center',
  },
})

export default AccountScreen
