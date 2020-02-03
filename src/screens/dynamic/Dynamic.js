import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView
} from 'react-native';

import {
  WithScreen
} from '@container'

import {
  styles,
} from './Dynamic.style';

@WithScreen('Dynamic', {
  showHeader: true,
})
class Dynamic extends Component {
  static navigationOptions = {
    headerShown: null
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('====== Dynamic props >>>>', this.props)

    return (
      <View style={styles.container}>
        <Text>
          {'Dynamic'}
        </Text>
      </View>
    );
  }
}

export default Dynamic;
