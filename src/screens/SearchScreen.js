import React, { useState, useEffect } from 'react'
import { View, TextInput, FlatList, Text, StyleSheet, Image } from 'react-native'
import { fetchProducts } from '../api'
import { ButtonTitles, Colors } from '../constants'
import Button from '../components/CustomButton'

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data.products)
        setSearchResults(data.products)
      } catch (error) {
        console.error('Error ::', error)
      }
    };
    getProducts()
  }, [])

  const handleSearch = () => {
    const filteredResults = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) //searching by title. we may introduce more properties here for search
    )
    setSearchResults(filteredResults)
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products"
        style={styles.input}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <Button title={ButtonTitles.SEARCH} onPress={handleSearch} />
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
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
  button: {
    marginVertical: 20,
  }
})

export default SearchScreen
