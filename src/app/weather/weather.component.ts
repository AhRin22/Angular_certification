
import { Component, Input, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { Weather } from '../Model/weather';
import { Location } from '../Model/location';
import { WeatherService } from '../weather.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

@Input() zipcode='';
location:Location = {zip:'',name:'', lat:0, lon:0,country:'' };
weather:Weather={ date:new Date(),description: '',icon: '',iconImage:'',currentTemp:0,maxTemp: 0, minTemp:0}

constructor( private weatherService:WeatherService, private locationServer:LocationService ) { }

ngOnInit(){
this. getWeatherOfLocation();
}

getWeatherOfLocation() {
this.locationServer.getLocationInfo(this.zipcode)
      .subscribe({
        next: (data) =>{
        this.location.zip = data.zip
        this.location.name = data.name
        this.location.lat = data.lat;
        this.location.lon = data.lon;
        this.location.country=data.country;
        this.getWeather(this.location.lat,this.location.lon)
      },
      error: (error) => {
        console.log(error.message)
      }
    })
  }

getWeather(lat:number,lon:number) {
 this.weatherService.getWeather(this.location.lat,this.location.lon)
 .subscribe({
  next: (data) =>{
  this.weather.icon=data.weather[0].icon;
  this.weather.description=data.weather[0].description;
  this.weather.currentTemp=data.main.temp;
  this.weather.minTemp=data.main.temp_min;
  this.weather.maxTemp=data.main.temp_max;
  this.weather.iconImage="http://openweathermap.org/img/wn/"+this.weather.icon+'@2x.png';
}, 
 error: (error) => {
  console.log(error.message) 
 }
})    
}

deleteLocation(location:string){
  this.locationServer.deleteLocation(location);
}

}
