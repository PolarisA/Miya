import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  styles,
} from './Mine.style';

class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>{'Mine'}</Text>
      </View>
    );
  }
}

export default Mine;
