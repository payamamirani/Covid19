import http from "./httpService";

const endPoint = "/doctortype";

export async function getDoctorTypes() {
  return http.get(endPoint);
}
