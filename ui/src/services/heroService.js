import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiHero;

export function getHeroes() {
  return http.get(apiEndPoint);
}

export function getHeroById(heroId) {
  return http.get(apiEndPoint + "/" + heroId);
}

export function deleteHero(heroId) {
  http.delete(apiEndPoint + "/" + heroId);
}

export function saveHero(hero) {
  if (hero.id) {
    const body = { ...hero };
    return http.put(apiEndPoint + "/" + hero.id, body);
  }

  return http.post(apiEndPoint, hero);
}
