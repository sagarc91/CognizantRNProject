import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions, Platform, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts, selectProducts } from '../redux/productSlice'
import { fetchProducts } from '../api'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAB } from 'react-native-paper'
import { Colors, Dimension, FontWeight } from '../constants'
import { Product } from '../types/product'
import FloatingActionButton from "../components/FloatingActionButton"
const windowWidth = Dimensions.get('window').width

type Nav = {
  navigate: (value: string, product?: {}) => void;
}

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch()
  const products: Product[] = useSelector(selectProducts)
  const navigation = useNavigation<Nav>()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [numColumns, setNumColumns] = useState<number>(2)

  useFocusEffect(
    React.useCallback(() => {
      const fetchLoginStatus = async () => {
        const loginStatus = await AsyncStorage.getItem('isLoggedIn')
        setIsLoggedIn(loginStatus === 'true')
      }

      fetchLoginStatus();
    }, [])
  )

  useEffect(() => {
    fetchProducts()
      .then(data => dispatch(setProducts(data.products)))
      .catch(error => console.error('Error:', error))
  }, [dispatch])

  const handleProductPress = (product: Product) => {
    navigation.navigate('Product', { product })
  }

  const handleAddProduct = () => {
    navigation.navigate('AddProduct')
  }

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
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
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={products}
          key={`${numColumns}`}
          keyExtractor={item => item?.id?.toString()}
          renderItem={renderProductItem}
          numColumns={numColumns}
          contentContainerStyle={styles.flatListContent}
        />
        {isLoggedIn && <FloatingActionButton onPress={handleAddProduct}
        />}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: Dimension.DIM2,
    backgroundColor: Colors.lightGrey
  },
  title: {
    fontSize: Dimension.DIM9,
    fontWeight: FontWeight.bold,
    marginBottom: Dimension.DIM5,
  },
  productItem: {
    flex: Dimension.DIM2,
    backgroundColor: Colors.white,
    margin: Dimension.DIM5,
    width: (windowWidth - Dimension.DIM8 * 2 - Dimension.DIM4) / 2,
    borderRadius: Dimension.DIM5,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {
          height: 1,
          width: 0,
        },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  thumbnail: {
    width: Dimension.width,
    height: Dimension.height1,
    resizeMode: 'cover',
    borderTopLeftRadius: Dimension.DIM5,
    borderTopRightRadius: Dimension.DIM5,
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
  flatListContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: Dimension.DIM5 / 2,
  },
})

export default HomeScreen
