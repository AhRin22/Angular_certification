import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Weather } from '../Model/weather';
import { Location } from '../Model/location';
import { LocationService } from '../location.service';
import { AppConstants } from '../AppConstants';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.css']
})
export class ForecastWeatherComponent implements OnInit {
  zipcode:string=''
  location:Location= {zip :'', name: '',lat: 0,lon: 0,country: ''}
  weathers:Array<Weather>=[];
  
constructor(private weatherService:WeatherService,
            private locationServer:LocationService,
            private router: Router,
            private route: ActivatedRoute) { }

ngOnInit() {
 this.zipcode = this.route.snapshot.params['zipcode'];
 this.getForecastDayWeatherOfLocation(this.zipcode)
}

getForecastDayWeatherOfLocation(zipcode:string) {
  this.locationServer.getLocationInfo(zipcode)
        .subscribe({
          next: (data) =>{
          this.location.zip = data.zip
          this.location.name = data.name
          this.location.lat = data.lat;
          this.location.lon = data.lon;
          this.location.country=data.country;
          this.getForecastDayWeather(this.location.lat,this.location.lon,AppConstants.numberOfDay)
        },
        error: (error) => {
          console.log(error.message)
        }
      })
}
  
  
getForecastDayWeather(lat:number, lon:number,numberOfDay:number) {

 this.weatherService.getDayForecastWeather(lat,lon,numberOfDay)
 .subscribe({
  next: (data) =>{
   for(let i=0;i<numberOfDay;i++){
    let weather:Weather={date:new Date(), description: '', icon: '', iconImage:'',currentTemp:0, maxTemp: 0, minTemp:0}
    weather.date=new Date(data.list[i].dt*1000);;
    weather.description=data.list[i].weather[0].description;
    weather.icon=data.list[i].weather[0].icon;
    weather.iconImage='http://openweathermap.org/img/wn/'+data.list[i].weather[0].icon+'@2x.png';
    weather.maxTemp=data.list[i].temp.max;
    weather.minTemp=data.list[i].temp.min;
    this.weathers.push(weather);
   }
  },
  error: (error) => {
    console.log(error.message)
  }
})
 }

backToMain(){
  this.router.navigate(['/location']);
 }
}
