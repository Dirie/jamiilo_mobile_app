import http from "./httpServices";
import { apiUrl } from "../config.json";

const url = apiUrl + "/movies";

function movieUrl(id) {
  return `${url}/${id}`;
}

export function getMovies() {
  return http.get(url);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

export async function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(url, movie);
}
