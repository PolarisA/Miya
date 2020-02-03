import {
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native'

const ios = Platform.OS === 'ios'
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundView: {
    width: 100,
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: width / 2 - 50,
    top: height / 3,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  activityIndicator: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  textContent: {
    top: 30,
    fontSize: 12,
    color: '#fff'
  }
})

export {
  styles,
  ios,
}
