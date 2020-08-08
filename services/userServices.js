import http from "./httpServices";
import { apiUrl } from "../config.json";

const url = apiUrl + "/auth/register";
const urlV = apiUrl + "/emailverify/send";

export function register(user) {
  const res = http.post(url, {
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    password: user.password,
  });
  console.log(res);
}

function sendUrl(email) {
  return `${urlV}/${email}`;
}

export function getsend(email) {
  return http.get(sendUrl(email));
}
