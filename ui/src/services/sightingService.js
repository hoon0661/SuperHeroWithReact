import http from "./httpService";
import config from "../config.json";

export function getSightings() {
  return http.get(config.apiSighting);
}

export function deleteSighting(sightingId) {
  return http.delete(config.apiSighting + "/" + sightingId);
}
