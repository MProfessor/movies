import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Video, ScrollView, Image } from "@tarojs/components";
import { http } from "@/utils/http";
import { AtFloatLayout, AtIcon, AtDivider } from "taro-ui";
import "./ysDetail.scss";

export default class Ysdetail extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
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
    http({ ysurl: detailUrl })
      .then((res: any) => {
        const urlList: any[] = res.list,
          info: object = res.data,
          url: string = res.list[this.state.current].m3u8url;
        console.log(info, urlList);
        this.setState({
          info,
          urlList,
          url,
        });
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  }
  handleAtFloatLayout = (key: string, show: boolean) => {
    this.setState({ [key]: show });
  };
  selectPart = (current: number) => {
    console.log("current", current);
    this.setState({
      current,
      url: this.state.urlList[current].m3u8url,
    });
  };
  render() {
    const { url, info, urlList, current, openDetail } = this.state;
    const currentStyle = {
      background: "#78a4fa",
      color: "#fff",
    };
    const elements = urlList.map((item: any, index: number) => (
      <View
        className="item at-col at-col-4"
        key={item.num}
        style={current === index ? currentStyle : {}}
        onClick={this.selectPart.bind(this, index)}
      >
        {item.num}
      </View>
    ));
    return (
      <View className="ysDetail">
        {url && (
          <Video
            className="myVideo"
            src={url}
            controls
            autoplay
            poster={info.cover}
            initialTime={0}
            id="video"
            loop={false}
            muted
            showMuteBtn
            enablePlayGesture
          ></Video>
        )}

        <View
          className="info"
          onClick={this.handleAtFloatLayout.bind(this, "openDetail", true)}
        >
          <View className="at-article__h1">{info.name}</View>
          <View className="at-article__info">
            {info.Language} - {info.region} - {info.genre}
          </View>
        </View>
        <AtDivider content="选集" lineColor="#ececec" />
        <ScrollView className="scrollview" scrollX scrollWithAnimation>
          <View className="list at-row">{elements}</View>
        </ScrollView>
        <AtFloatLayout
          isOpened={openDetail}
          title="详情"
          onClose={this.handleAtFloatLayout.bind(this, "openDetail", false)}
        >
          <View className="info">
            <View className="at-article__h1">{info.name}</View>
            <View className="at-article__info">
              {info.Release} - {info.region} - {info.genre} - {info.Language}
            </View>
            <View className="at-article__content">
              <View className="at-article__section">
                <View className="at-article__p">{info.introduce}</View>
                <View className="at-article__p">演员: {info.performer}</View>
                <Image
                  className="at-article__img"
                  src={info.cover}
                  mode="widthFix"
                />
              </View>
            </View>
          </View>
        </AtFloatLayout>
      </View>
    );
  }
}
