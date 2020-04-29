import axios from "axios"
import { tokenTimeOut } from "@/config/common.config"
// import { cacheLoginStatus } from "@/network/api";

//同步锁, 表示是否有过期的token正在刷新
let isRefreshing = false;

export function request(config) {
  const instance = axios.create({
    timeout: 6000
  });

  // 让每个请求都携带当前用户的认证token
  instance.interceptors.request.use(config => {
    // 如果是不需要登陆的请求, 则直接过
    if (config.requireLogin === false) {
      return config
    }
    if (isRefreshing) {
      console.log("正在刷新");
      throw "正在刷新token"
    } else {
      // 访问需要登录的请求(因为会在切换路由时判断登录状态, 所以发送请求时一定有token
      const token = window.localStorage.getItem("token");
      const tokenCreateTime = new Date(window.localStorage.getItem("tokenCreateTime"));
      const nowTime = new Date();
      // token正常, 带上请求头即可
      if ((nowTime - tokenCreateTime) < tokenTimeOut) {
        console.log("正常的请求, 加上了请求头");
        config.headers["Authorization"] = token;
        return config
      } else {  // 如果token过期了
        console.log("token过期了");
        window.location.href = "/login";
      }
    }
  }, err => {
    console.log("request.js: 请求拦截器->请求失败 " + err);
  });


  instance.interceptors.response.use(response => {
    if (response.data.code >= 20000) //  如果状态码大于20000, 就抛出异常
      throw response.data;
    else // 正常返回
      return response.data;
  });
  return instance(config);
}
