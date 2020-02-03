/**
 * @Author : HuiWen
 * @Date : 2019-12-02
 * @Description :
 * 百思不得姐 接口缘故 下一页的np由当前的数据返回可得
 * 所以没有pageNo 和 pageSize
 **/
import React, { Component, ReactElement } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import {
  image
} from '@common'

import {
  LoadingView
} from '@container'

import {
  styles,
} from './style'

const {
  icon: {
    icEmpty
  },
} = image

const EmptyComponent = ({ content, onReload }) => (
  <View style={styles.emptyContainer}>
    <Image
      style={styles.emptyIcon}
      source={icEmpty}
    />

    <Text style={styles.emptyTips}>
      {content || '页面飞出太阳系了o(╥﹏╥)o'}
    </Text>
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.emptyBtnView}
      onPress={onReload}>
      <Text style={styles.emptyText}>{'点击重试'}</Text>
    </TouchableOpacity>
  </View>
);

type Column = {
  index: number,
  data: Array<any>,
}

export type Props = {
  data: Array<any>,
  api?: ?any,
  numColumns: number,
  renderItem: ({ item: any, index: number, column: number }) => ?ReactElement<any, >,
  ListEmptyComponent?: ?(React.ComponentType<any> | React.ReactElement<any>),
  ListRenderHeader?: ?(React.ComponentType<any> | React.ReactElement<any>),
  style?: StyleSheet.ViewStyleProp | any,
  keyExtractor?: (item: any, index: number) => string,
  contentContainerStyle?: any,
  onScroll?: (event: Object) => void,
  scrollToTop?: ?boolean,
  renderScrollComponent: (props: Object) => React.ReactElement<any>,
}

type State = {
  columns: Array<Column>
}

class List extends Component<Props, State> {
  static defaultProps = {
    numColumns: 1,
    data: []
  };

  constructor(props) {
    super(props);
    const {
      data,
    } = props;

    this.state = {
      isRefresh: false,
      canLoadMore: true,
      isLoading: false,
      data,
      np: 0,
    };
  }

  _listRefs: Array<?FlatList> = [];

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh() {
    this.stateRefreshing(() => {
      this.request();
    });
  }

  stateRefreshing(callback) {
    this.setState({
      isRefresh: true,
      isLoading: true,
      canLoadMore: false,
    }, () => {
      callback && callback();
    });
  }

  async request() {
    const { api } = this.props;
    if (!api) {
      return this.stateInitial();
    }

    const { info, list } = await api({ np: 0 });
    // console.log('======== List res >>>>>', info);
    let _success = info && info.np !== 0
    if (!_success)
      return

    const { np } = info
    let timer = setTimeout(() => {
      clearTimeout(timer)
      this.setState({
        isRefresh: false,
        isLoading: false,
        np,
        data: list,
      })
    }, 2000)
  }

  stateInitial(callback) {
    this.setState({
      isRefresh: false,
      canLoadMore: false,
      isLoading: false,
    }, () => {
      callback && callback();
    });
  }

  _onRefreshData(refreshing) {
    if (refreshing) {
      this.setState({
        isRefresh: true,
        np: 0,
      }, () => this._onRefresh())
    }
  }

  async _onRefresh() {
    const { api } = this.props
    const { info, list } = await api({ np: this.state.np })
    // console.log('======== List res >>>>>', info);
    let _success = info && info.np !== 0
    if (!_success)
      return

    const { np } = info
    let timer = setTimeout(() => {
      clearTimeout(timer)
      this.setState({
        isRefresh: false,
        isLoading: false,
        np,
        data: list,
      })
    }, 2000)
  }

  _onLoadMore() {
    const { np } = this.state

    if (!np) {
      let timer = setTimeout(() => {
        clearTimeout(timer)
        this.setState({
          canLoadMore: false,
        })
      }, 1200)
    }
    this.setState({
      canLoadMore: true,
    }, () => this._onLoadMoreData())
  }

  async _onLoadMoreData() {
    const { api } = this.props
    const { data, np } = this.state

    const { info, list } = await api({ np })
    let _success = info && info.np !== 0
    if (!_success)
      return

    let _list = [].concat(data)
    for (let i = 0; i < list.length; i++) {
      _list.push(list[i])
    }

    let timer = setTimeout(() => {
      clearTimeout(timer)
      this.setState({
        data: _list,
        np: info.np,
        canLoadMore: false,
      })
    }, 500)
  }

  _renderDefaultHeader() {
    const { ListRenderHeader } = this.props;
    if (ListRenderHeader) {
      return (
        <ListRenderHeader/>
      );
    }
    return (
      <View/>
    );
  }

  _genIndicator() {
    const { canLoadMore } = this.state

    return (
      <View style={styles.indicatorContainer}>
        {
          canLoadMore ?
            <ActivityIndicator
              style={styles.indicator}
              size={'small'}
              animating={true}
            /> : null
        }
      </View>
    )
  }

  _onScroll = event => {
    if (this.props.onScroll) {
      this.props.onScroll(event);
    }
  };

  _onLayout = event => {
    if (this.props.onLayout) {
      this.props.onLayout(event)
    }
  };

  render() {
    // console.log('===== list props >>>>', this.props);
    // console.log('====== list state >>>>', this.state)
    const { data, isRefresh, isLoading } = this.state;
    const {
      style,
      ListRenderHeader,
      numColumns,
      renderItem,
      keyExtractor,
      ...props
    } = this.props;

    const content = (
      <View style={styles.container}>
        <FlatList
          {...props}
          ref={ref => {
            this._listRefs = ref;
          }}
          data={data}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => renderItem({ item, i })}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={() => {
                this._onRefreshData(true)
              }}
            />
          }
          ListFooterComponent={() => this._genIndicator()}
          ListHeaderComponent={() => this._renderDefaultHeader()}
          ListEmptyComponent={() => {
            return <EmptyComponent
              content={''}
              onReload={() => {
                this.handleRefresh()
              }}
            />;
          }}
          onEndReached={() => this._onLoadMore()}
          keyExtractor={keyExtractor}
          onScroll={(e) => this._onScroll(e)}
          onLayout={(e) => this._onLayout(e)}
        />
      </View>
    );

    if (isLoading) {
      return <LoadingView/>
    }

    return content
  }
}

export default List;
