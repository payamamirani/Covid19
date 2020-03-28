import http from "./httpService";

const endPoint = "/humanservice";

export async function getHumanService(id) {
  return http.get(`${endPoint}/${id}`);
}

export async function getHumanServices() {
  return http.get(endPoint);
}

export async function postHumanServices(obj) {
  return http.post(endPoint, obj);
}
