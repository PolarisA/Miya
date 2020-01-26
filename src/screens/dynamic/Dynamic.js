import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  styles,
} from './Dynamic.style';

class Dynamic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>{'Dynamic'}</Text>
      </View>
    );
  }
}

export default Dynamic;
