import React, { Component } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'

import {
  styles,
} from './List.style'

import {
  WithScreen,
  WithToast,
  MiYaList,
} from '@container'

import {
  api
} from '@common'

const {
  getMiYaList
} = api

@WithToast
@WithScreen('DynamicList', {
  showHeader: true,
})
class DynamicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      list: [],
      isRefresh: false,
    }
  }

  componentDidMount() {

  }


  // async initData() {
  //   console.log('==== get data start ====')
  //   const { info, list } = await getMiYaList({ np: 0 })
  //   let _success = info && 'count' in info
  //   if (!_success)
  //     return
  //
  //   let timer = setTimeout(() => {
  //     clearTimeout(timer)
  //     this.setState({
  //       info,
  //       list,
  //       loading: false
  //     })
  //     console.log('==== get data end ====')
  //   }, 2000)
  // }

  //
  // _onReload = () => {
  //   console.log('======= app _onReload');
  //   this.getReloadList();
  // };
  //
  //
  // async getReloadList() {
  //   console.log('====== getReloadList');
  //   const res = await getMiYaList({ np: 0 });
  //   console.log('======= res >>>>', res);
  // }
  //
  // _onRefresh = () => {
  //   const { isRefresh } = this.state;
  //   const params = {
  //     page: 0,
  //     pageSize: 20,
  //   };
  //
  //   if (!isRefresh) {
  //     this.setState({
  //       isRefresh: true,
  //     }, () => this.onRefreshData(params));
  //   }
  // };
  //
  // async onRefreshData(params) {
  //   console.log('====== onRefreshData params >>>>', params);
  //   let timer = setTimeout(() => {
  //     clearTimeout(timer);
  //     this.setState({
  //       isRefresh: false,
  //     });
  //   }, 1500);
  // }

  renderItemView(item, index) {
    return (
      <TouchableOpacity
        style={{ padding: 15, backgroundColor: '#fff', marginTop: 2.5 }}
        activeOpacity={0.8}
        key={`item_${index}`}
        onPress={() => this.onItemClick(item)}>
        <Text style={{ fontSize: 14, color: '#666' }}>{item.text || ''}</Text>
      </TouchableOpacity>
    )
  }


  onItemClick(item) {
    console.log('====== onItemClick >>>> ', item);
    const { showToast } = this.props
    showToast('hello')
  }


  render() {
    console.log('===== DynamicList props >>>>', this.props)
    // console.log('===== DynamicList state >>>>', this.state)
    const { list, isRefresh, loading } = this.state
    // let _isEmpty = !(list && list.length)
    // if (loading) {
    //   return <LoadingView/>
    // }

    return (
      <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
        <MiYaList
          numColumns={1}
          api={getMiYaList}
          ref={ref => this._flatList = ref}
          // data={list}
          // refreshing={_isEmpty ? false : isRefresh}
          // onRefresh={_isEmpty ? null : this._onRefresh}
          // onReload={this._onReload}
          // style={{ flex: 1 }}
          // ListRenderEmpty={}
          contentContainerStyle={{ flexGrow: 1 }}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => this.renderItemView(item, index)}/>

      </SafeAreaView>
    )
  }
}

export default DynamicList


