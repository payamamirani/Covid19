import http from "./httpService";
import JwtDecode from "jwt-decode";
import { getUserInfo } from "./userInfoService";

const endPoint = "/session";
const tokenKey = "Token";

http.setJwt(getJwt());

export async function login(verificationCode) {
  http.setJwt(getJwt());
  const { data } = await http.post(endPoint, {
    VerificationCode: verificationCode
  });

  if (!data.success) return Promise.reject(new Error(data.message));

  localStorage.setItem(tokenKey, data.payload[0]);
  http.setJwt(getJwt());

  const { data: User } = await getUserInfo();
  if (User.success)
    localStorage.setItem("User", JSON.stringify(User.payload[0]));
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("User");
  http.setJwt(getJwt());
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const u = localStorage.getItem("User");
    if (u) return JSON.parse(u).User;
    const jwt = localStorage.getItem("Token");
    const user = JwtDecode(jwt);
    if (user) return user;
    return null;
  } catch (ex) {}
}

export function getCurrentUserPrivileges() {
  try {
    const u = localStorage.getItem("User");
    if (u) return JSON.parse(u).Privileges;
    return null;
  } catch (ex) {}
}
