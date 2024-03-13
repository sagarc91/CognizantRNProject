import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Dimension, FontWeight } from '../constants'

const ProductScreen = ({ route }) => {
  const { product } = route.params

  return (
    <View style={styles.container}>
      <Image style={styles.thumbnail} source={{ uri: product.thumbnail }} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.price}>Brand: {product.brand}</Text>
      <Text style={styles.price}>Category: {product.category}</Text>
      <Text style={styles.price}>Rating: {product.rating}</Text>
      <Text style={styles.price}>Stock: {product.stock}</Text>
      <Text style={styles.price}>Discount: {product.discountPercentage}</Text>
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
  description: {
    fontSize: Dimension.DIM7,
    marginBottom: Dimension.DIM5,
  },
  price: {
    fontSize: Dimension.DIM7,
    fontWeight: FontWeight.bold,
  },
  thumbnail: {
    width: Dimension.width,
    height: Dimension.height,
    resizeMode: 'cover',
    marginBottom: Dimension.DIM5,
  },
})

export default ProductScreen
