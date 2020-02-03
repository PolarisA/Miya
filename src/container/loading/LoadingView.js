/**
 * @Description:
 * @author HuiWen
 * @date 2020/2/3
 */
import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from "react-native";

const ANIMATION = ['none', 'slide', 'fade'];
const SIZES = ['small', 'normal', 'large'];

import { styles } from "./style";

export type Props = {
  cancelable?: ?boolean,
  color?: ?string,
  animation?: ?string,
  overlayColor?: ?string,
  size?: ?string,
  textContent?: ?string,
  textStyle?: StyleSheet.ViewStyleProp | any,
  visible?: ?boolean,
  indicatorStyle?: StyleSheet.ViewStyleProp | any,
  customIndicator?: ?(React.ComponentType<any> | React.ReactElement<any>),
  children: (props: Object) => React.ReactElement<any>,
  spinnerKey?: ?boolean,
}

class LoadingView extends Component<Props> {
  static defaultProps = {
    visible: true,
    cancelable: false,
    textContent: '努力加载中...',
    animation: 'fade',
    color: 'white',
    size: 'large',
    overlayColor: 'rgba(0, 0, 0, 0.25)',
    textStyle: { fontSize: 14, color: '#fff' }
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      textContent: props.textContent || ''
    }
  }

  render() {
    const {
      customIndicator,
      color,
      size,
      indicatorStyle,
      textStyle
    } = this.props
    const { textContent } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.backgroundView}>
          {
            customIndicator
              ? customIndicator
              : (
                <ActivityIndicator
                  color={color}
                  size={size}
                  style={[styles.activityIndicator, { ...indicatorStyle }]}
                />
              )
          }
          <View style={[styles.textContainer, { ...indicatorStyle }]}>
            <Text style={[styles.textContent, { ...textStyle }]}>
              {textContent}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

export default LoadingView
