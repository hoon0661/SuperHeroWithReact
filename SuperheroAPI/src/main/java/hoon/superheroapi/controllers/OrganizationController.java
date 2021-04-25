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
import hoon.superheroapi.models.Organization;
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
@RequestMapping("/api/organization")
public class OrganizationController {
    @Autowired
    HeroDao heroDao;
    
    @Autowired
    LocationDao locationDao;
    
    @Autowired
    OrganizationDao organizationDao;
    
    @Autowired
    SightingDao sightingDao;
    
    @GetMapping
    public List<Organization> getAllOrganizations(){
        return organizationDao.getAllOrganizations();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Organization> getOrganizationById(@PathVariable int id){
        Organization result = organizationDao.getOrganizationById(id);
        if(result == null){
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(result);
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Organization addOrganization(@RequestBody Organization organization){
        return organizationDao.addOrganization(organization);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity updateOrganization(@PathVariable int id, @RequestBody Organization organization){
        ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if(id != organization.getId()){
            response = new ResponseEntity(HttpStatus.UNPROCESSABLE_ENTITY);
        } else{
            organizationDao.updateOrganization(organization);
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity deleteOrganization(@PathVariable int id){
        ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if(organizationDao.getOrganizationById(id) != null){
           organizationDao.deleteOrganizationById(id);
           return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }
}
    
