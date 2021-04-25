/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hoon.superheroapi.controllers;

import hoon.superheroapi.data.HeroDao;
import hoon.superheroapi.data.LocationDao;
import hoon.superheroapi.data.OrganizationDao;
import hoon.superheroapi.data.SightingDao;
import hoon.superheroapi.models.Hero;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hoon0
 */
@RestController
@RequestMapping("/api/hero")
public class HeroController {
    @Autowired
    HeroDao heroDao;
    
    @Autowired
    LocationDao locationDao;
    
    @Autowired
    OrganizationDao organizationDao;
    
    @Autowired
    SightingDao sightingDao;
    
    @GetMapping
    public List<Hero> getAllHeroes(){
        return heroDao.getAllHeroes();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Hero> getHeroById(@PathVariable int id){
        Hero result = heroDao.getHeroById(id);
        if(result == null){
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(result);
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Hero addHero(@RequestBody Hero hero){
        return heroDao.addHero(hero);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity updateHero(@PathVariable int id, @RequestBody Hero hero){
        ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if(id != hero.getId()){
            response = new ResponseEntity(HttpStatus.UNPROCESSABLE_ENTITY);
        } else {
            heroDao.updateHero(hero);
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity deleteHero(@PathVariable int id){
        ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if(heroDao.getHeroById(id) != null){
            heroDao.deleteHeroById(id);
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }
}
