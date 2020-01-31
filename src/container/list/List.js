import React, { Component, ReactElement } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { image } from '@common'
import {
  styles,
} from './style'

const {
  icEmpty
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

const { width, height } = Dimensions.get('window');

type Column = {
  index: number,
  data: Array<any>,
}

export type Props = {
  data: Array<any>,
  api?: ?any,
  numColumns: number,
  renderItem: ({ item: any, index: number, column: number }) => ?ReactElement<any, >,
  ListRenderFooter?: ?(React.ComponentType<any> | React.ReactElement<any>),
  ListRenderHeader?: ?(React.ComponentType<any> | React.ReactElement<any>),
  style?: StyleSheet.ViewStyleProp | any,
  keyExtractor?: (item: any, index: number) => string,
  onEndReached?: ?(info: { distanceFromEnd: number }) => void,
  contentContainerStyle?: any,
  onScroll?: (event: Object) => void,
  refreshing?: ?boolean,
  renderScrollComponent: (props: Object) => React.ReactElement<any>,
  onRefresh?: ?Function,
}

type State = {
  columns: Array<Column>
}

class List extends Component<Props, State> {
  static defaultProps = {
    numColumns: 1,
  };

  constructor(props) {
    super(props);
    const {
      data,
    } = props;

    this.state = {
      pageNo: 1,
      pageSize: 20,
      refreshing: false,
      loadMore: false,
      data,
    };
  }

  _listRefs: Array<?FlatList> = [];

  componentDidMount() {
    this.handleRefresh();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps && nextProps.data !== this.props.data) {
      this.setState({
        data: nextProps.data,
      });
    }
  }

  _onReload = () => {
    const { onReload } = this.props;
    onReload && onReload();
  };

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

  _renderDefaultFooter() {
    const { ListRenderFooter } = this.props;
    if (ListRenderFooter) {
      return (
        <ListRenderFooter/>
      );
    }
    return (
      <View style={{ width, marginBottom: 20 }}/>
    );
  }

  handleRefresh() {
    const { refreshing } = this.props;
    if (refreshing) {
      return;
    }

    this.stateRefreshing(() => {
      this.request();
    });
  }

  stateInitial(callback) {
    this.setState({
      refreshing: false,
      loadMore: false,
    }, () => {
      callback && callback();
    });
  }

  stateRefreshing(callback) {
    this.setState({
      refreshing: true,
      loadMore: false,
      pageNo: 1,
    }, () => {
      callback && callback();
    });
  }

  async request() {
    const { pageNo, pageSize } = this.state;
    const {
      api,
      param,
    } = this.props;

    if (!api) {
      return this.stateInitial();
    }

    let requestParams = {
      pageNo,
      pageSize,
      ...param,
    };

    const res = await api(requestParams);
    console.log('======== List res >>>>>', res);

  }

  render() {
    console.log('===== list props >>>>', this.props);
    const { data } = this.state;
    const {
      style,
      ListRenderFooter,
      ListRenderHeader,
      ListRenderEmpty,
      numColumns,
      renderItem,
      onEndReached,
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
          onEndReached={onEndReached}
          ListFooterComponent={() => this._renderDefaultFooter()}
          ListHeaderComponent={() => this._renderDefaultHeader()}
          ListEmptyComponent={() => {
            return <EmptyComponent
              content={''}
              onReload={this._onReload}
            />;
          }}
          keyExtractor={keyExtractor}
        />
      </View>
    );

    return content;
  }
}

export default List;
