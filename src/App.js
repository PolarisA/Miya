import React from 'react';
import {
  createAppContainer,
} from 'react-navigation';

import {
  createBottomTabNavigator,
} from 'react-navigation-tabs'

import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators
} from 'react-navigation-stack'

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';

import {
  Home,
  Mine,
  Dynamic,
} from '@screens'

import {
  autoWidth
} from '@common/utils/ScreenUtils'

const ios = Platform.OS === 'ios'

const IMAGE = {
  Home: require('../assets/image/ic_home.png'),
  Mine: require('../assets/image/ic_mine.png')
}

const MainTab = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state
      return {
        tabBarIcon: props => <TabBarIcon {...props} routeName={routeName}/>,
      }
    }
  },
  Mine: {
    screen: Mine,
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state
      return {
        tabBarIcon: props => <TabBarIcon {...props} routeName={routeName}/>,
      }
    }
  },
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: true,
  lazy: true,
  backBehavior: 'none',
  tabBarOptions: {
    activeTintColor: 'rgb(22,131,251)',
    inactiveTintColor: '#959595',
    pressColor: 'rgb(22,131,251)',
    style: {
      backgroundColor: '#ffffff',
      height: autoWidth(48),
      borderTopColor: '#fff',
      borderTopWidth: 0
    },
    indicatorStyle: { height: 1 },
    showIcon: true,
    labelStyle: {
      fontSize: autoWidth(12),
      marginTop: autoWidth(0)
    },
    iconStyle: {
      width: autoWidth(16),
      height: autoWidth(16)
    }
  }
})

const TabBarIcon = ({ routeName, tintColor }) => {
  return (
    <Image
      source={IMAGE[routeName]}
      style={[styles.image, { tintColor: tintColor }]}
      resizeMode="contain"
    />
  )
}

const AppStack = createStackNavigator({
  Home: MainTab,
  Dynamic,
}, {
  initialRouteName: 'Home',
  headerMode: "none",
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // 切换路由时水平动画
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit, // 切换路时 Header 动画
})

const styles = StyleSheet.create({
  image: {
    height: 24,
  },
  imgContainer: {
    paddingHorizontal: ios ? 10 : 12,
  }
})

export default function App() {
  const AppContainer = createAppContainer(AppStack)

  return <AppContainer/>
}
