import React, { Component } from 'react';
import {
  View,
  StatusBar,
} from 'react-native';

import { styles } from './style'

export type Props = {
  backgroundColor?: ?string,
}

class GeneralStatusBarColor extends Component<Props> {
  static defaultProps = {
    backgroundColor: '#722ed1'
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { backgroundColor } = this.props
    return (
      <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...this.props} />
      </View>
    )
  }
}

export default GeneralStatusBarColor;
