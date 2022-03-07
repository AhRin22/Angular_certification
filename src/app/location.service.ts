import { Injectable } from '@angular/core';
import { AppConstants } from './AppConstants';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locations:Array<string>=[];
 
  constructor(private http: HttpClient) { 
     let locationInLocalStorge = localStorage.getItem("locations");
     if(locationInLocalStorge!==null)
      this.locations=JSON.parse(locationInLocalStorge);
   }
 
   getLocationInfo(location:string){
      const url= `${AppConstants.baseUrl}/geo/1.0/zip?zip=${location}&appid=${AppConstants.api}`
      return this.http.get<any>(url)
   }
 
   addLocation(location:string){
    this.locations.push(location)
    localStorage.setItem('locations', JSON.stringify(this.locations));
   }
   
   deleteLocation(location:string){
     const index = this.locations.indexOf(location, 0);
     if (index > -1) {
        this.locations.splice(index, 1);
     }
     localStorage.setItem('locations', JSON.stringify(this.locations));
   }
 }
 