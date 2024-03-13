import React, { useState, useEffect } from 'react'
import { View, TextInput, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Colors, Dimension, FontWeight } from '../constants'
import { useSelector } from 'react-redux'
import { selectProducts } from '../redux/productSlice'
import Icon from 'react-native-vector-icons/FontAwesome'

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const products = useSelector(selectProducts);

  const [searchResults, setSearchResults] = useState(products)

  useEffect(() => {
    handleSearch()
  }, [searchQuery])

  const handleSearch = () => {
    const filteredResults = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) //searching by title. we may introduce more properties here for search
    )
    setSearchResults(filteredResults)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search products"
          style={styles.input}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.iconContainer}>
          <Icon name="search" size={24} color={Colors.gray} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />
            <View style={{ padding: 10 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </View>
        )}
      />
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Dimension.DIM2,
    borderColor: Colors.gray,
    borderRadius: Dimension.DIM4,
    marginBottom: Dimension.DIM7,
    paddingHorizontal: Dimension.DIM6,
    backgroundColor: Colors.white
  },
  input: {
    flex: 1,
    height: Dimension.DIM10,
    paddingHorizontal: Dimension.DIM6,
  },
  iconContainer: {
    padding: Dimension.DIM3,
  },
})

export default SearchScreen
