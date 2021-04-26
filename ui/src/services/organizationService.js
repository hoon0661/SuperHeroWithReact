import http from "./httpService";
import config from "../config.json";

export function getOrganizations() {
  return http.get(config.apiOrganization);
}

export function deleteOrganization(organizationId) {
  http.delete(config.apiOrganization + "/" + organizationId);
}
