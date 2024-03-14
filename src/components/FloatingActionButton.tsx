import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Dimension } from '../constants'

interface FloatingActionButtonProps {
  onPress: () => void
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Icon name="plus" size={24} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: Dimension.DIM8,
    bottom: Dimension.DIM8,
    backgroundColor: Colors.primary,
    borderRadius: Dimension.DIM10,
    width: Dimension.DIM10,
    height: Dimension.DIM10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default FloatingActionButton
