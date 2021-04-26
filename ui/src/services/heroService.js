import http from "./httpService";
import config from "../config.json";

export function getHeroes() {
  return http.get(config.apiHero);
}

export function deleteHero(heroId) {
  http.delete(config.apiHero + "/" + heroId);
}
