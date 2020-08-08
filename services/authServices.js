import http from "./httpServices";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const url = apiUrl + "/auth/login";
const token = "token";

http.setJwt(getJwt());

export async function login(phone, password) {
  const { data: jwt } = await http.post(url, { phone, password });
  localStorage.setItem(token, jwt.token);
  console.log("token generated...");
}

export function loginWithJwt(jwt) {
  localStorage.setItem(token, jwt);
}

export function logout() {
  localStorage.removeItem(token);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(token);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(token);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
