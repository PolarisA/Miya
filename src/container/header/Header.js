import React from 'react'
import {
  View,
  Text,
  Image
} from 'react-native'
import {
  styles
} from './style'

import {
  icBack
} from '@assets'

export default props => {
  return (
    <View style={styles.container}>
      <Image
        source={icBack}
        style={[styles.image, { tintColor: props.tintColor }]}
        {...props}
      />
    </View>
  )
}
