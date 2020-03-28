import http from "./httpService";

const endPoint = "/service";

export async function getServices() {
  return http.get(endPoint);
}
