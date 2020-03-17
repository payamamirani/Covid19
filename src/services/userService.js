import http from "./httpService";

const endPoint = "/user";

export async function sendVerificationCode(cellNo) {
  const { data } = await http.post(endPoint, { CellNumber: cellNo });

  if (!data.success) return Promise.reject(new Error(data.message));

  localStorage.setItem("Token", data.payload[0]);
}
