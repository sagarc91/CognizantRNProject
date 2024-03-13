import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Colors, Dimension, FontWeight } from '../constants'
import Button from '../components/CustomButton'

const AddProductScreen: React.FC = () => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<string>('')

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
                style={[styles.input, styles.multilineInput]}
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
        marginBottom: Dimension.DIM2,
    },
    input: {
        backgroundColor: Colors.white,
        borderWidth: Dimension.DIM2,
        borderColor: Colors.white,
        borderRadius: Dimension.DIM4,
        padding: Dimension.DIM5,
        marginBottom: Dimension.DIM7,
        fontSize: Dimension.DIM7,
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },
})

export default AddProductScreen
