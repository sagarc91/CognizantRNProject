import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import * as Keychain from 'react-native-keychain'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/CustomButton'
import { Colors, ButtonTitles, Dimension, Spacing } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'
//I haven't added any validations or such a things in any of the file. As per basic requirements i have designed and implmented

const AccountScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await AsyncStorage.getItem('isLoggedIn')
      if (loginStatus === 'true') {
        const credentials = await Keychain.getGenericPassword()
        if (credentials && credentials.username) {
          setIsLoggedIn(true)
          const userDetails = { username: credentials.username }
          setUserInfo(userDetails)
        }
      }
    };

    checkLoginStatus()
  }, [])

  const handleLogin = async () => {
    const isValid = true

    if (isValid) {
      await Keychain.setGenericPassword(username, password)
      setIsLoggedIn(true)
      const userDetails = { username: username }
      setUserInfo(userDetails)
      await AsyncStorage.setItem('isLoggedIn', 'true')
    } else {
      // here we can show invalid credentials login, we can show pop-up
    }
  };

  const handleLogout = async () => {
    await Keychain.resetGenericPassword()
    setIsLoggedIn(false)
    setUserInfo(null)
    await AsyncStorage.removeItem('isLoggedIn')
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Icon name="university" size={100} color={Colors.primary} style={styles.logoIcon} />
      </View>
      <View style={styles.card}>
        <Text style={styles.heading}>{!isLoggedIn ? "Login" : "Welcome back"}</Text>
        {isLoggedIn ? (
          <View style={{ justifyContent: "center" }}>
            <View style={styles.iconContainer}>
              <Icon name="user" size={200} color={Colors.black} style={styles.icon} />
            </View>            
            <Text style={styles.welcomeText}>Hi, {userInfo && userInfo.username}!</Text>
            <Button style={{ width: "100%" }} title={ButtonTitles.LOGOUT} onPress={handleLogout} />
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
    flex: 1,
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
    borderRadius: 10,
    padding: Dimension.DIM8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Dimension.DIM8,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.gray,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: Dimension.DIM4,
    paddingHorizontal: Dimension.DIM2,
  },
  icon: {
    marginHorizontal: Dimension.DIM5,
  },
  input: {
    flex: 1,
    height: Spacing.buttonHeight,
    paddingHorizontal: Dimension.DIM4,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: Dimension.DIM4,
  },
  iconContainer: {
    alignItems: 'center',
  },
})

export default AccountScreen
