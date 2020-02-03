import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  api,
} from '@common'

import {
  styles,
} from './Home.style';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onPush() {
    console.log('====== _onPush props >>> ', this.props)
    const { navigation } = this.props
    // navigation.push('Dynamic')
    navigation.push('DynamicList')
  }

  render() {
    console.log('====== home props >>>>', this.props)

    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.homeBtnView}
          onPress={() => this._onPush()}>
          <Text>{'home'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
