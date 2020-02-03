import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

import { withNavigation } from 'react-navigation';

import {
  styles,
  PADDING_SIZE
} from './style'

import {
  image
} from '@common'

const {
  icon: {
    icBack
  }
} = image

export type Props = {
  title?: ?string,
  visibleLeftItem?: ?boolean,
  rightItem?: ?(React.ComponentType<any> | React.ReactElement<any>),
  rightTitle?: ?string,
  rightState?: ?boolean,
  onPressRight?: ?Function,
  rightItemStyle?: any,
  leftItem?: ?(React.ComponentType<any> | React.ReactElement<any>),
  leftTitle?: ?string,
  leftIcon?: ?string,
  rightIcon?: ?string,
  onPressLeft?: ?Function,
  leftItemStyle?: any,
  style?: any,
  titleStyle?: any,
}

class Header extends Component<Props> {
  static defaultProps = {
    visibleLeftItem: true,
    leftTitle: null,
  }

  constructor(props) {
    super(props);
  }

  _goBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  initLeftItem() {
    const { leftTitle, onPressLeft } = this.props
    return (
      <TouchableOpacity
        activeOpacity={.8}
        style={[styles.leftItemView, { paddingLeft: PADDING_SIZE }]}
        onPress={onPressLeft ? onPressLeft : this._goBack}>
        <Text style={styles.initLeftTxt}>
          {leftTitle}
        </Text>
      </TouchableOpacity>
    )
  }

  defaultLeftItem() {
    const { onPressLeft, leftIcon } = this.props
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.leftItemView, { paddingLeft: PADDING_SIZE }]}
        onPress={onPressLeft ? onPressLeft : this._goBack}>
        <Image source={leftIcon ? leftIcon : icBack} style={styles.backIcon}/>
      </TouchableOpacity>
    )
  }

  initRightTitle() {
    const { rightState, rightTitle, onPressRight } = this.props
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!rightState}
        style={[styles.initRightView, { paddingRight: PADDING_SIZE }]}
        onPress={rightState && onPressRight ? onPressRight : () => {
        }}>
        <Text style={{ fontSize: 14, color: rightState ? '#fff' : '#ffffff7f' }}>
          {rightTitle || ''}
        </Text>
      </TouchableOpacity>
    )
  }

  initRightItem() {
    const { rightIcon, onPressRight } = this.props
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.initRightView, { paddingRight: PADDING_SIZE }]}
        onPress={onPressRight ? onPressRight : () => {
        }}>
        <Image source={rightIcon} style={styles.backIcon}/>
      </TouchableOpacity>
    )
  }

  render() {
    const {
      style,
      leftTitle,
      leftItemStyle,
      visibleLeftItem,
      leftItem,
      titleStyle,
      title,
      rightTitle,
      rightItemStyle,
      rightItem,
      rightIcon
    } = this.props

    let _isVisibleLeft = !!(visibleLeftItem && leftItem && leftTitle)

    return (
      <View style={[styles.container, { style }]}>
        <View style={[styles.leftItemView, leftItemStyle]}>
          {_isVisibleLeft ? this.initLeftItem() : this.defaultLeftItem()}
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleTxt, titleStyle]} numberOfLines={1}>
            {title || ''}
          </Text>
        </View>
        <View style={[styles.rightItemView, rightItemStyle]}>
          {
            rightItem
              ? rightItem
              : rightTitle
              ? this.initRightTitle()
              : rightIcon
                ? this.initRightItem()
                : null
          }
        </View>
      </View>
    )
  }
}

export default withNavigation(Header)
