import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from './AppConstants';


@Injectable({
  providedIn: 'root'
})

export class WeatherService {

constructor(private http: HttpClient) { }

getWeather(lat:number,lon:number){
  const url = `${AppConstants.baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${AppConstants.api}`
  return this.http.get<any>(url)
}

getDayForecastWeather(lat:number,lon:number,numberOfDay:number){
 const url = `${AppConstants.baseUrl}/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&&cnt${numberOfDay}=&appid=${AppConstants.api}`
 return this.http.get<any>(url)
}

}
