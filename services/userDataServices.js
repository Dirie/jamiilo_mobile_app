import http from "./httpServices";
import { apiUrl } from "../config.json";

const url = apiUrl + "/userData";
/*
get: localhost:3000/userData
post: localhost:3000/userData
put: localhost:3000/userData/id
delete: localhost:3000/userData/id
*/

function userDataUrl(id) {
  return `${url}/${id}`;
}

export function getUsersData() {
  return http.get(url);
}

export function deleteUserData(userDataId) {
  return http.delete(userDataUrl(userDataId));
}

export async function getUserData(userDataId) {
  return http.get(userDataUrl(userDataId));
}

export function saveUserData(userData) {
  if (userData._id) {
    const body = { ...userData };
    delete body._id;
    return http.put(userDataUrl(userData._id), body);
  }
  return http.post(url, userData);
}
