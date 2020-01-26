import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

const ios = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeBtnView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
  }
});


export {
  styles,
};
