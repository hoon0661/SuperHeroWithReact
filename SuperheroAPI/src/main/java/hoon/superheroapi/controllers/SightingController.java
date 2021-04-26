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
import hoon.superheroapi.models.Sighting;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin
@RestController
@RequestMapping("/api/sighting")
public class SightingController {
     @Autowired
    HeroDao heroDao;
    
    @Autowired
    LocationDao locationDao;
    
    @Autowired
    OrganizationDao organizationDao;
    
    @Autowired
    SightingDao sightingDao;
    
    @GetMapping
    public List<Sighting> getAllSightings(){
        return sightingDao.getAllSightings();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Sighting> getSightingById(@PathVariable int id){
        Sighting result = sightingDao.getSightingById(id);
        if(result == null){
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(result);
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Sighting addSighting(@RequestBody Sighting sighting){
        return sightingDao.addSighting(sighting);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity updateSighting(@PathVariable int id, @RequestBody Sighting sighting){
        ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if(id != sighting.getId()){
            response = new ResponseEntity(HttpStatus.UNPROCESSABLE_ENTITY);
        } else {
            sightingDao.updateSighting(sighting);
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity deleteSighting(@PathVariable int id){
        ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if(sightingDao.getSightingById(id) != null){
            sightingDao.deleteSightingById(id);
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }
}
