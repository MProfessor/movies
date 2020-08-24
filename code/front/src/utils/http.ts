import Taro from "@tarojs/taro";
const baseUrl: string = "http://api.pingcc.cn/";
export const http: any = (data: object) =>
  new Promise((resolve, reject) => {
    Taro.request({
      url: baseUrl,
      data: data,
      header: {
        "content-type": "application/json", // 默认值
      },
      success: (res: any) => {
        if (res.data.code === 0) {
          resolve(res.data);
        } else {
          reject(res.data.message);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
