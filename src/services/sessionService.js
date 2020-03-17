import http from "./httpService";
import JwtDecode from "jwt-decode";

const endPoint = "/session";
const tokenKey = "Token";

http.setJwt(getJwt());

export async function login(verificationCode) {
  const { data } = await http.post(endPoint, {
    VerificationCode: verificationCode
  });

  debugger;
  if (!data.success) return Promise.reject(new Error(data.message));

  localStorage.setItem(tokenKey, data.payload[0]);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return JwtDecode(jwt);
  } catch (ex) {}
}
