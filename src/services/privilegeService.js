import http from "./httpService";

const endPoint = "/privilege";

export async function getPrivileges() {
  return http.get(endPoint);
}
