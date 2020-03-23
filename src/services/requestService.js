import http from "./httpService";

const endPoint = "/request";

export async function saveRequest(request) {
  return http.post(endPoint, request);
}

export async function getRequests() {
  return http.get(endPoint);
}
