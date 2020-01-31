import React from 'react'
import {
  StyleSheet,
  Platform,
  Dimensions,
  StatusBar
} from 'react-native'

import {
  autoWidth
} from '@common/utils/ScreenUtils'

const ios = Platform.OS === 'ios'
const { width, height } = Dimensions.get('window')
const STATUSBAR_HEIGHT = ios ? 44 : StatusBar.currentHeight;
const navBarBtn = { height: ios ? 44 : 50, width: 70 }
const PADDING_SIZE = autoWidth(8)

const styles = StyleSheet.create({
  container: {
    width,
    height: navBarBtn.height,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#722ed1',
    alignItems: 'flex-end',
  },
  leftItemView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    ...navBarBtn,
  },
  initLeftTxt: {
    fontSize: 14,
    color: '#fff',
  },
  defaultLeftView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    backgroundColor: 'transparent',
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 1,
    height: navBarBtn.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
    width: width - navBarBtn.width * 2,
  },
  rightItemView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    ...navBarBtn,
  },
  initRightView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
})


export {
  styles,
  PADDING_SIZE
}
