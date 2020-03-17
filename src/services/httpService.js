import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
  console.log("Logging the error", error);
  toast.error("خطای سرویس");

  return Promise.reject(error);
});

function setJwt(jwt) {
  if (jwt) axios.defaults.headers.common["Token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
