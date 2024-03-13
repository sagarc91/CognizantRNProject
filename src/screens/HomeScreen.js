import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts, selectProducts } from '../redux/productSlice'
import { fetchProducts } from '../api'
import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native';
import { Colors, Dimension, FontWeight } from '../constants'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const navigation = useNavigation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      const fetchLoginStatus = async () => {
        const loginStatus = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(loginStatus === 'true');
      };
  
      fetchLoginStatus();
    }, [])
  )

  useEffect(() => {
    const fetchLoginStatus = async () => {
      const loginStatus = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(loginStatus === 'true');
    };
  
    fetchLoginStatus();
  }, [isLoggedIn])

  useEffect(() => {
    const fetchLoginStatus = async () => {
      const loginStatus = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(loginStatus === 'true');
    };
  
    fetchLoginStatus();
  }, [isLoggedIn])


  useEffect(() => {
    fetchProducts()
      .then(data => dispatch(setProducts(data.products)))
      .catch(error => console.error('Error::', error));
  }, [dispatch])

  const handleProductPress = (product) => {
    navigation.navigate('Product', { product })
  }

  const handleAddProduct = () => {
    navigation.navigate('AddProduct')
  }

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)} title=''>
      <View style={styles.productItem}>
        <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProductItem}
      />
      {isLoggedIn ? <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddProduct}
      /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: Dimension.DIM2,
    padding: Dimension.DIM7,
  },
  title: {
    fontSize: Dimension.DIM9,
    fontWeight: FontWeight.bold,
    marginBottom: Dimension.DIM5,
  },
  productItem: {
    marginBottom: Dimension.DIM7,
    backgroundColor: Colors.white,
  },
  thumbnail: {
    width: Dimension.width,
    height: Dimension.height,
    resizeMode: 'cover',
    marginBottom: Dimension.DIM5,
  },
  price: {
    fontSize: Dimension.DIM7,
    fontWeight: FontWeight.bold,
  },
  fab: {
    position: 'absolute',
    margin: Dimension.DIM7,
    right: Dimension.DIM1,
    bottom: Dimension.DIM1,
    backgroundColor: Colors.primary,
  },
})

export default HomeScreen
