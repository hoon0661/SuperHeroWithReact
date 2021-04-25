/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hoon.superheroapi.data;


import hoon.superheroapi.models.Hero;
import java.util.List;

/**
 *
 * @author Hoon
 */
public interface HeroDao {
    Hero getHeroById(int id);
    List<Hero> getAllHeroes();
    Hero addHero(Hero hero);
    void updateHero(Hero hero);
    void deleteHeroById(int id);
   
    List<Hero> getHeroesForOrganization(int organizationId);
//    List<Hero> getHeroesForLocation(Location location);
    List<Hero> getHeroesForLocation(String location);
}
