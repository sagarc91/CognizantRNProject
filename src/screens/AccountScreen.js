import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import * as Keychain from 'react-native-keychain'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/CustomButton'
import { Colors, ButtonTitles, Dimension, Spacing } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'

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
          setIsLoggedIn(true);
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
      {isLoggedIn ? (
        <View>
          <Icon name="user" size={200} color={Colors.black} />
          <Text>Welcome, {userInfo && userInfo.username}!</Text>
          <Button title={ButtonTitles.LOGOUT} onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Button title={ButtonTitles.LOGIN} onPress={handleLogin} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: Dimension.DIM2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 5,
    height: Spacing.buttonHeight,
    width:  Spacing.buttonWidth,
    marginBottom: Dimension.DIM6,
    paddingHorizontal: Dimension.DIM6,
  },
})

export default AccountScreen
