import React, { PureComponent } from 'react'
import Toast from "react-native-root-toast";

const getDisplayName = component => {
  return component.name || component.displayName || 'Component'
}

export default WrappedComponent => (
  class WithToast extends PureComponent {
    static displayName = `HOC(${getDisplayName(WrappedComponent)}}`

    constructor(props) {
      super(props);
    }

    showToast = (msg, {
      duration = Toast.durations.SHORT,
      position = Toast.positions.CENTER,
      shadow = true,
      animation = true,
      hideOnPress = true,
      delay = 0,
      onShow = () => {
        // calls on toast\`s appear animation start
      },
      onShown = () => {
        // calls on toast\`s appear animation end.
      },
      onHide = () => {
        // calls on toast\`s hide animation start.
      },
      onHidden = () => {
        // calls on toast\`s hide animation end.
      }
    } = {}) => {
      Toast.show(msg, {
        duration,
        position,
        shadow,
        animation,
        hideOnPress,
        delay,
        onShow,
        onShown,
        onHidden,
        onHide,
      });
    }

    render() {
      const newProps = {
        showToast: this.showToast,
        Toast,
      }

      return (
        <WrappedComponent {...this.props} {...newProps}/>
      )
    }
  }
)
