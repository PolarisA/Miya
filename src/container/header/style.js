import React from 'react'
import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native'

const ios = Platform.OS === 'ios'
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    backgroundColor: '#722ed1',
  },
  backIcon: {
    backgroundColor: 'transparent',
    width: 16,
    height: 16,
    resizeMode: 'contain',
  }
})


export {
  styles
}
