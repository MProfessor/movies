import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image, ScrollView } from "@tarojs/components";
import { http } from "@/utils/http";
import { AtList, AtListItem } from "taro-ui";
import "./mhDetail.scss";

export default class Msdetail extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      urlList: [],
      current: 0,
      openDetail: false,
    };
  }
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onLoad(options) {
    console.log(options);
    const detailUrl: string = decodeURIComponent(options.url);
    http({ mhurl1: detailUrl })
      .then((res: any) => {
        const urlList: any[] = res.list,
          info: object = res.data;
        console.log(info, urlList);
        this.setState({
          info,
          urlList,
        });
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  }

  goToRead = (value: string) => {
    const url: string = encodeURIComponent(value);
    Taro.navigateTo({
      url: `/pages/mhRead/mhRead?url=${url}`,
    });
  };
  render() {
    const { info, urlList } = this.state;
    const scrollTop = 0,
      Threshold = 10;
    return (
      <View className="mhDetail">
        <View className="bgCover">
          <Image className="bgImg" src={info.cover} mode="aspectFill"></Image>
        </View>
        <View className="info">
          <View className="at-article__h1">{info.name}</View>
          <View className="at-article__h3">作者: {info.author}</View>
          <View className="at-article__info">
            {info.tag} - {info.status} - {info.time}
          </View>
          <View className="at-article__content">
            <View className="at-article__section">
              <View className="at-article__p">{info.introduce}</View>
            </View>
          </View>
        </View>
        <ScrollView
          className="scrollview"
          scrollY
          scrollWithAnimation
          scrollTop={scrollTop}
          lowerThreshold={Threshold}
          upperThreshold={Threshold}
          onScrollToUpper={this.props.onScrollToUpper} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}
        >
          <AtList>
            {urlList &&
              urlList.map((item, index) => {
                return (
                  <AtListItem
                    arrow="right"
                    key={index}
                    title={item.num}
                    onClick={this.goToRead.bind(this, item.url)}
                  />
                );
              })}
          </AtList>
        </ScrollView>
      </View>
    );
  }
}
