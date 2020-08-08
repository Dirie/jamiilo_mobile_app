import { apiUrl } from "../config.json";
import http from "./httpServices";

export function getGenres() {
  return http.get(apiUrl + "/genres");
}
