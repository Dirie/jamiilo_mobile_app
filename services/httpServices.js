import axios from "axios";
import { apiUrl } from "../config.json";

axios.defaults.baseURL = apiUrl;
// axios.defaults.headers.common["Authorization"] = "private-key";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export function setJwt(jwt) {
  // axios.defaults.headers.common["x-auth-token"] = jwt;
  axios.defaults.headers.common["authorization"] = jwt;
}
export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
  setJwt,
};
