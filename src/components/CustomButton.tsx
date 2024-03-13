import React from 'react'
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native'
import { Colors, Spacing } from '../constants'

interface ButtonProps extends TouchableOpacityProps {
    title: string
}

const Button: React.FC<ButtonProps> = ({ title, onPress, ...props }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} {...props}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        height: Spacing.buttonHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
    },
})

export default Button
