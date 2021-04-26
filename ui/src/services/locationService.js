import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiLocation;

export function getLocations() {
  return http.get(apiEndPoint);
}

export function deleteLocation(locationId) {
  http.delete(apiEndPoint + "/" + locationId);
}
