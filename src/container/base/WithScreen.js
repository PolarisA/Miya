import React from 'react'
import {
  View,
  Platform,
  SafeAreaView
} from 'react-native'

import {
  withNavigation
} from 'react-navigation'

import Header from "../header/Header";
import GeneralStatusBarColor from '../header/GeneralStatusBarColor'
import { styles } from "./style";

const ios = Platform.OS === 'ios'

const getDisplayName = component => {
  return component.displayName || component.name || 'Component'
}

@withNavigation
export default (title = '', {
  showHeader = true,
  headerProps = {},
} = {}) => WrappedComponent => (
  class WithScreen extends WrappedComponent {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`

    constructor(props) {
      super(props);
      console.log('===== Screen props >>>>', props)
      this.state = {
        title,
      }
    }

    onChangeTitle = (title) => {
      this.setState({
        title,
      })
    }

    goBack = () => {
      const { navigation } = this.props
      navigation.goBack()
    }

    render() {
      const { title } = this.state
      const newProps = {
        changeTitle: this.onChangeTitle,
        ...this.props.navigation.state.params
      }

      return (
        <View style={{ flex: 1 }}>
          <GeneralStatusBarColor backgroundColor="#722ed1" barStyle="light-content"/>
          <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
            {
              showHeader
                ? <Header
                  className="header"
                  style={{ backgroundColor: '#722ed1' }}
                  title={title}
                  onPressLeft={this.goBack}
                  {...headerProps}
                /> : null
            }
            <WrappedComponent {...this.props} {...newProps}/>
          </SafeAreaView>
        </View>
      )
    }
  }
)
