import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtSearchBar, AtTabs, AtTabsPane, AtMessage } from "taro-ui";
import "./index.scss";
import GridList from "@/components/GridList";
import { http } from "@/utils/http";
const tabList: any[] = [
  { title: "影视" },
  { title: "漫画" },
  { title: "小说" },
];
export default class Index extends Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {
      value: "",
      yslist: [],
      mhlist: [],
      xslist: [],
      current: 0,
      windowHeight: 1334,
    };
  }
  onChange = (value: string) => {
    this.setState({
      value: value,
    });
  };
  onClear = () => {
    this.setState({
      value: "",
    });
  };
  onActionClick = () => {
    this.initData(this.state.current, this.state.value);
  };
  handleClick = (current) => {
    if (this.state.current === current) return;
    this.setState({
      value: "",
      current: current,
    });
    if (this.state.yslist.length && current === 0) return;
    if (this.state.mhlist.length && current === 1) return;
    if (this.state.xslist.length && current === 2) return;
    this.initData(current, "");
  };
  onScrollToUpper = () => {};
  onScroll = () => {
    // console.log(e.detail);
  };
  goToDetail = (data) => {
    const index = this.state.current;
    const page =
      index === 0 ? "ysDetail" : index === 1 ? "mhDetail" : "xsDetail";
    Taro.navigateTo({
      url: `/pages/${page}/${page}?url=${encodeURIComponent(data)}`,
    });
  };
  render() {
    const windowHeight = this.state.windowHeight,
      indexStyle = {
        height: windowHeight * 2 + "rpx",
      },
      scrollHeight = windowHeight * 2 - 180,
      ysList = this.state.yslist,
      mhList = this.state.mhlist,
      xsList = this.state.xslist,
      current = this.state.current,
      value = this.state.value;
    return (
      <View className="index" style={indexStyle}>
        <AtMessage />
        <AtSearchBar
          className="searchBar"
          value={value}
          onChange={this.onChange}
          onClear={this.onClear}
          onActionClick={this.onActionClick}
        />
        <AtTabs
          className="mainTabs"
          current={current}
          tabList={tabList}
          onClick={this.handleClick}
        >
          {tabList.map((item, index: number) => {
            const dataList =
              index === 0 ? ysList : index === 1 ? mhList : xsList;
            return (
              <AtTabsPane key={item.title} current={current} index={index}>
                {dataList.length > 0 && (
                  <GridList
                    onScrollToUpper={this.onScrollToUpper}
                    onScroll={this.onScroll}
                    onClick={this.goToDetail}
                    list={dataList}
                    height={scrollHeight}
                  ></GridList>
                )}
              </AtTabsPane>
            );
          })}
        </AtTabs>
      </View>
    );
  }
  // componentWillMount() {}
  initData(current: number, searchStr: string) {
    Taro.atMessage({ message: "加载中...", type: "info", duration: 15000 });
    const search: any = {
      searchApiName:
        current === 0 ? "ysname" : current === 1 ? "mhname" : "xsname",
      detailApiName:
        current === 0 ? "ysurl" : current === 1 ? "mhurl1" : "xsurl1",
      listName: current === 0 ? "yslist" : current === 1 ? "mhlist" : "xslist",
    };

    http({ [search.searchApiName]: searchStr })
      .then((allData) => {
        let urlList: object[] = [];
        const httpAll: any[] = allData.list.map((item, index) => {
          const item_1: object = { index: index, url: item.url };
          urlList = urlList.concat([item_1]);
          return http({ [search.detailApiName]: item.url }).catch((err) => {
            console.log("single err", err);
          });
        });
        Promise.all(httpAll).then((list: any[]) => {
          const dataList = list
            .filter((item) => item)
            .map((item, index) => {
              return { ...item.data, ...urlList[index] };
            });
          this.setState({
            [search.listName]: dataList,
          });
          Taro.atMessage({
            message: `共找到${dataList.length}条结果`,
            type: "success",
            duration: 3000,
          });
        });
      })
      .catch((err: string) => {
        console.log("single err", err);
        Taro.atMessage({ message: err, type: "error", duration: 3000 });
      });
  }
  componentDidMount() {
    const res = Taro.getSystemInfoSync();
    this.setState({
      windowHeight: res.windowHeight,
    });
    this.initData(this.state.current, "");
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
}
