import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts, selectProducts } from '../redux/productSlice'
import { fetchProducts } from '../api'
import { useNavigation } from '@react-navigation/native'
import { FAB } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { Colors, Dimension, FontWeight } from '../constants'

const windowWidth = Dimensions.get('window').width

const HomeScreen = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const navigation = useNavigation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [numColumns, setNumColumns] = useState(2)

  useFocusEffect(
    React.useCallback(() => {
      const fetchLoginStatus = async () => {
        const loginStatus = await AsyncStorage.getItem('isLoggedIn')
        setIsLoggedIn(loginStatus === 'true')
      };
  
      fetchLoginStatus()
    }, [])
  )

  useEffect(() => {
    fetchProducts()
      .then(data => dispatch(setProducts(data.products)))
      .catch(error => console.error('Error::', error))
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
        key={`${numColumns}`} // Update key prop to force a fresh render
        keyExtractor={item => item.id.toString()}
        renderItem={renderProductItem}
        numColumns={numColumns}
        contentContainerStyle={styles.flatListContent}
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
    flex: 1,
    padding: Dimension.DIM7,
    backgroundColor: Colors.lightGrey
  },
  title: {
    fontSize: Dimension.DIM9,
    fontWeight: FontWeight.bold,
    marginBottom: Dimension.DIM5,
  },
  productItem: {
    flex: 1,
    backgroundColor: Colors.white,
    margin: Dimension.DIM5 / 2, // Adjust margin to create spacing between items
    width: (windowWidth - Dimension.DIM8 * 2 - Dimension.DIM5) / 2, // Set width of each item
    borderRadius: Dimension.DIM5, // Add border radius to create rounded corners
    overflow: 'hidden', // Hide any overflow content
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
    width: '100%',
    height: Dimension.height / 2, // Set height of thumbnail
    resizeMode: 'cover',
    borderTopLeftRadius: Dimension.DIM5, // Add border radius to top-left and top-right corners
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
    flexDirection: 'row', // Ensure items are displayed in rows
    flexWrap: 'wrap', // Allow items to wrap to the next row when needed
    justifyContent: 'space-between', // Space items evenly between each row
    padding: Dimension.DIM5 / 2, // Add padding to the content container to ensure items are centered
  },
})

export default HomeScreen
