import { request } from './request'
import store from "@/store";

export function deleteByUsername(username) {
  const parms = [username]
  const path = getPath(parms)
  console.log("http://localhost:9000/sys/user" + path);
  return request({
    url: "http://localhost:9000/sys/user" + path,
    method: "DELETE"
  })
}


export function getUserData(username, page, size) {
  const parms = [username, page, size]
  const path = getPath(parms)
  console.log("http://localhost:9000/sys/user" + path);
  return request({
    url: "http://localhost:9000/sys/user" + path,
    method: "GET"
  })
}

export function getDailyData(type, structure, statId, startTime, endTime, page, size) {
  const parms = [type, structure, statId, startTime, endTime, page, size]
  const path = getPath(parms)
  console.log("http://localhost:9001" + path);
  return request({
    url: "http://localhost:9001" + path,
    method: "GET"
  })
}

export function getOnlineData(type, structure, statId, startTime, endTime, page, size) {
  const parms = [type, structure, statId, startTime, endTime, page, size]
  const path = getPath(parms)
  console.log("http://localhost:9001" + path);
  return request({
    url: "http://localhost:9001" + path,
    method: "GET"
  })
}

export function changeNickname(newNickname) {
  return request({
    url: "/sys/user/nickname",
    method: "PATCH",
    data: {
      "nickname": newNickname
    }
  })
}

export function postLogin(username, password) {
  return request({
    url: "http://localhost:9000/sys/login",
    method: "POST",
    requireLogin: false,
    data: {
      "username": username,
      "password": password
    }
  })
}


export function cacheLoginStatus(userData) {
  store.commit("setLoginStatus", true);  // 缓存登陆状态
  //存储认证token和认证时间
  window.localStorage.setItem("token", userData.token);
  window.localStorage.setItem("tokenCreateTime", new Date() + "");
  window.localStorage.setItem("nickname", userData.username);
}

function getPath(params) {
  let res = "";
  for (let i = 0; i < params.length; i++) {
    if (params[i] != null && params[i].length !== 0)
      res += '/' + params[i];
  }
  return res;
}
