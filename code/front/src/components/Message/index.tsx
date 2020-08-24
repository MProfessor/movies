import { AtMessage } from "taro-ui";
import React, { Component } from "react";
export default class Message extends Component {
  render() {
    return <AtMessage />;
  }
  showMsg = (msg: string, type: any, duration: number) => {
    Taro.atMessage({
      message: msg,
      type: type,
      duration: duration,
    });
  };
}
