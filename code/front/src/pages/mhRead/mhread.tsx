import React, { Component } from "react";
import { View, Image } from "@tarojs/components";
import { http } from "@/utils/http";
import "./mhRead.scss";

export default class MhRead extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      urlList: [],
    };
  }
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onLoad(options) {
    console.log(options);
    const detailUrl: string = decodeURIComponent(options.url);
    http({ mhurl2: detailUrl })
      .then((res: any) => {
        const urlList: any[] = res.list;
        console.log(urlList, urlList);
        this.setState({
          urlList,
        });
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  }

  render() {
    const { urlList } = this.state;
    return (
      <View className="mhRead">
        {urlList &&
          urlList.map((item, index) => {
            return (
              <Image
                lazyLoad
                key={index}
                className="content"
                src={item.img}
                mode="widthFix"
              ></Image>
            );
          })}
      </View>
    );
  }
}
