import {
  Platform,
  Dimensions,
  StyleSheet
} from 'react-native'

const ios = Platform.OS = 'ios'
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  emptyIcon: {
    width: width * 0.35,
    height: width * 0.35,
    marginBottom: 10,
  },
  emptyTips: {
    fontSize: 18,
    color: '#d1d1d1',
    marginBottom: 25,
  },
  emptyBtnView: {
    paddingHorizontal: 25,
    paddingVertical: 7.5,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#cdcdcd',
  },
  cell: {
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export {
  styles
}
