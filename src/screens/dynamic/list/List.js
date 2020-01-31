import React, { Component } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from 'react-native'

import {
  styles,
} from './List.style'

import {
  GeneralStatusBarColor
} from '@container'

class DynamicList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    console.log('===== DynamicList props >>>>', this.props)
    // console.log('==== DynamicList GeneralStatusBarColor >>> ', GeneralStatusBarColor)

    return (
      <View style={{ flex: 1 }}>
        <GeneralStatusBarColor
          backgroundColor="#722ed1"
          barStyle="light-content"/>

        <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>

          <Text>
            {'DynamicList'}
          </Text>
        </SafeAreaView>

      </View>
    )
  }
}

export default DynamicList
