import http from "./httpService";

const endPoint = "/role";

export async function getRoles() {
  return http.get(endPoint);
}
