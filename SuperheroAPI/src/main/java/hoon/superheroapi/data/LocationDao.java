/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hoon.superheroapi.data;


import hoon.superheroapi.models.Location;
import java.util.List;

/**
 *
 * @author Hoon
 */
public interface LocationDao {
    Location getLocationById(int id);
    List<Location> getAllLocations();
    Location addLocation(Location location);
    void updateLocation(Location location);
    void deleteLocationById(int id);
    List<Location> getLocationForHero(String heroName);
}
