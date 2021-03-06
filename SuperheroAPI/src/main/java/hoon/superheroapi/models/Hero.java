/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hoon.superheroapi.models;


import java.util.List;
import java.util.Objects;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 *
 * @author Hoon
 */
public class Hero {
    private int id;
    
    @NotBlank(message = "Name must not be empty.")
    @Size(max = 30, message = "Name must be less than 30 characters.")
    private String name;
    
    @NotBlank(message = "Description must not be empty.")
    @Size(max = 200, message = "Description must be less than 200 characters.")
    private String description;
    
    @NotBlank(message = "Super power must not be empty.")
    @Size(max = 50, message = "Super power must be less than 50 characters.")
    private String superpower;
    
   
    @NotBlank(message = "Please choose hero type.")
    private String herotype;
    
    @NotBlank(message = "Please provide url for image")
    private String imgurl;
    private List<Organization> organizations;
//    private List<Sighting> sightings; 

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSuperpower() {
        return superpower;
    }

    public void setSuperpower(String superpower) {
        this.superpower = superpower;
    }

    public String getHerotype() {
        return herotype;
    }

    public void setHerotype(String herotype) {
        this.herotype = herotype;
    }

    public String getImgurl() {
        return imgurl;
    }

    public void setImgurl(String imgurl) {
        this.imgurl = imgurl;
    }

    public List<Organization> getOrganizations() {
        return organizations;
    }

    public void setOrganizations(List<Organization> organizations) {
        this.organizations = organizations;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 59 * hash + this.id;
        hash = 59 * hash + Objects.hashCode(this.name);
        hash = 59 * hash + Objects.hashCode(this.description);
        hash = 59 * hash + Objects.hashCode(this.superpower);
        hash = 59 * hash + Objects.hashCode(this.herotype);
        hash = 59 * hash + Objects.hashCode(this.imgurl);
        hash = 59 * hash + Objects.hashCode(this.organizations);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Hero other = (Hero) obj;
        if (this.id != other.id) {
            return false;
        }
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.superpower, other.superpower)) {
            return false;
        }
        if (!Objects.equals(this.herotype, other.herotype)) {
            return false;
        }
        if (!Objects.equals(this.imgurl, other.imgurl)) {
            return false;
        }
        if (!Objects.equals(this.organizations, other.organizations)) {
            return false;
        }
        return true;
    }
}
