import React, { PureComponent } from 'react'
import {
  View,
} from 'react-native'

import Header from '../header/Header'

const getDisplayName = component => {
  return component.displayName || component.name || 'Component'
}

export default (title = 'header') => WrappedComponent => (
  class WithHeader extends PureComponent {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <View style={{ flex: 1 }}>
          <Header
            className="header"
            onPressLeft={() => {
              this.back()
            }}
            leftItemStyle={{ paddingLeft: 12 }}
            style={{ backgroundColor: '#722ed1' }}
            titleStyle={{ color: '#fff' }}
            title={title}
          />
          <WrappedComponent {...this.props}/>
        </View>
      )
    }
  }
)
