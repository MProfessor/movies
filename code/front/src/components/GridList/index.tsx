import React from "react";
import { View, Image, ScrollView } from "@tarojs/components";
import "./index.scss";
export default class GridList extends React.Component<any, any> {
  constructor(props: object) {
    super(props);
    this.state = {};
  }
  render() {
    const scrollTop = 0;
    const Threshold = 20;
    const style = {
      height: this.props.height + "rpx",
    };
    return (
      <ScrollView
        className="scrollview"
        style={style}
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
        onScrollToUpper={this.props.onScrollToUpper} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}
        onScroll={this.props.onScroll}
      >
        <View className="at-row at-row--wrap">
          {this.props.list.map((item, index) => {
            const timestamp: number = index;
            return (
              <View
                key={timestamp}
                className="at-col at-col-4"
                onClick={this.props.onClick.bind(this, item.url)}
              >
                <Image mode="aspectFill" lazyLoad className="cover" src={item.cover}></Image>
                <View className="title">{item.name}</View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
