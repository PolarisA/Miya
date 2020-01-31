import {
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native'

const ios = Platform.OS === 'ios'
const { width, height } = Dimensions.get('window')
const navBarBtn = { height: ios ? 44 : 50 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  iosStatusBar: {
    width: '100%',
    backgroundColor: '#722ed1',
    ...navBarBtn
  }
})

export {
  styles
}
