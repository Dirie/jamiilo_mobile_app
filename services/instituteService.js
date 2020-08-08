import http from "./httpServices";
import { apiUrl } from "../config.json";

const url = apiUrl + "/institute";

/*
get: localhost:3000/institute
post: localhost:3000/institute
put: localhost:3000/institute/id
delete: localhost:3000/institute/id

*/

function InstituteUrl(id) {
  return `${url}/${id}`;
}

export function getInstitutes() {
  return http.get(url);
}

export function deleteInstitute(instituteId) {
  return http.delete(InstituteUrl(instituteId));
}

export async function getInstitute(instituteId) {
  return http.get(InstituteUrl(instituteId));
}

export function saveInstitute(institute) {
  if (institute._id) {
    const body = { ...institute };
    delete body._id;
    return http.put(InstituteUrl(institute._id), body);
  }
  return http.post(url, institute);
}
