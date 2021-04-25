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
import hoon.superheroapi.models.Location;
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
@RequestMapping("/api/location")
public class LocationController {
    
    @Autowired
    HeroDao heroDao;
    
    @Autowired
    LocationDao locationDao;
    
    @Autowired
    OrganizationDao organizationDao;
    
    @Autowired
    SightingDao sightingDao;
    
    @GetMapping
    public List<Location> getAllLocations(){
        return locationDao.getAllLocations();
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Location addLocation(@RequestBody Location location){
        return locationDao.addLocation(location);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable int id){
        Location result = locationDao.getLocationById(id);
        if(result == null){
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(result);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity updateLocation(@PathVariable int id, @RequestBody Location location){
        ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if(id != location.getId()){
            response = new ResponseEntity(HttpStatus.UNPROCESSABLE_ENTITY);
        } else {
            locationDao.updateLocation(location);
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity deleteLocation(@PathVariable int id){
        try{
            locationDao.deleteLocationById(id);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }catch(Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}
