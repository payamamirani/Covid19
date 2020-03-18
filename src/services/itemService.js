import http from "./httpService";

const endPoint = "/items";

export async function getItems() {
  return http.get(endPoint);
}
