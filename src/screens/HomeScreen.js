import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import { fetchProducts } from '../api'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts().then(data => setProducts(data.products))
  }, [])

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />
      <View style={{ padding: 10 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProductItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productItem: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default HomeScreen
