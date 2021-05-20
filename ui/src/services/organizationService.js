import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiOrganization;

export function getOrganizations() {
  return http.get(apiEndPoint);
}

export function getOrganizationById(organizationId) {
  return http.get(apiEndPoint + "/" + organizationId);
}

export function deleteOrganization(organizationId) {
  http.delete(apiEndPoint + "/" + organizationId);
}

export function saveOrganization(organization) {
  console.log(organization);
  if (organization.id) {
    const body = { ...organization };
    return http.put(apiEndPoint + "/" + organization.id, body);
  }

  return http.post(apiEndPoint, organization);
}
