import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { Colors, Dimension, FontWeight } from '../constants'

//NOTE: this is a simple form i have created just to display a form. no actions involved

const AddProductScreen = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    const handleSubmit = () => {
        // Handle the logic for form submission here
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={[styles.input, { height: 100 }]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
                multiline
            />
            <Text style={styles.label}>Price:</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price"
                keyboardType="numeric"
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: Dimension.DIM2,
        padding: Dimension.DIM7,
    },
    label: {
        fontSize: Dimension.DIM7,
        fontWeight: FontWeight.bold,
        marginBottom: Dimension.DIM5,
    },
    input: {
        borderWidth: Dimension.DIM2,
        borderColor: Colors.gray,
        borderRadius: Dimension.DIM4,
        padding: Dimension.DIM5,
        marginBottom: Dimension.DIM7,
    },
})

export default AddProductScreen
