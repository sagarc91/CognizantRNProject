import React from 'react'
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native'
import { Colors, Spacing, Dimension } from '../constants'

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
        borderRadius: Dimension.DIM4,
        marginVertical: Dimension.DIM6,
    },
    buttonText: {
        color: Colors.white,
        fontSize: Dimension.DIM7, //here can create size constants but temporary used Dimension.
    },
})

export default Button
