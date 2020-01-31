import {
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native'

const { width, height } = Dimensions.get('window')
const ios = Platform.OS === 'ios'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export {
  styles,
}
