import http from "./httpService";
import JwtDecode from "jwt-decode";

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
    if (u) return u;
    const jwt = localStorage.getItem(tokenKey);
    let user = JwtDecode(jwt);
    if (user && user.User) user = JSON.parse(user.User);
    return user;
  } catch (ex) {}
}
