import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { Dimension, FontWeight } from '../constants'
import { Product } from '../types/product'

type RootStackParamList = {
  Product: { product: Product }
}

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'Product'>

type ProductScreenProps = {
  route: ProductScreenRouteProp
}

const ProductScreen: React.FC<ProductScreenProps> = ({ route }) => {
  const { product } = route.params

  return (
    <View style={styles.container}>
      <Image style={styles.thumbnail} source={{ uri: product.thumbnail }} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Price:</Text>
          <Text style={styles.detailValue}>${product.price}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Brand:</Text>
          <Text style={styles.detailValue}>{product.brand}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Category:</Text>
          <Text style={styles.detailValue}>{product.category}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Rating:</Text>
          <Text style={styles.detailValue}>{product.rating}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Stock:</Text>
          <Text style={styles.detailValue}>{product.stock}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Discount:</Text>
          <Text style={styles.detailValue}>{product.discountPercentage}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: Dimension.DIM2,
  },
  title: {
    fontSize: Dimension.DIM9,
    fontWeight: FontWeight.bold,
    marginBottom: Dimension.DIM5,
    marginHorizontal: Dimension.DIM6,
  },
  description: {
    fontSize: Dimension.DIM7,
    marginBottom: Dimension.DIM5,
    marginHorizontal: Dimension.DIM6,
  },
  price: {
    fontSize: Dimension.DIM7,
    fontWeight: FontWeight.bold,
  },
  thumbnail: {
    width: '100%',
    height: Dimension.height3,
    resizeMode: 'cover',
    marginBottom: Dimension.DIM5,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: Dimension.DIM6,
  },
  detailItem: {
    width: '50%',
    marginBottom: Dimension.DIM5,
  },
  detailTitle: {
    fontSize: Dimension.DIM7,
    fontWeight: FontWeight.bold,
    marginBottom: Dimension.DIM2,
  },
  detailValue: {
    fontSize: Dimension.DIM7,
  },
})

export default ProductScreen