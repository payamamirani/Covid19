import http from "./httpService";

const endPoint = "/userinfo";

export async function saveUserInfo(userInfo) {
  return http.post(endPoint, userInfo);
}

export async function getUserInfo() {
  return http.get(endPoint);
}
