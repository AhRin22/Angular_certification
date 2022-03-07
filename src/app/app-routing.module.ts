import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastWeatherComponent } from './forecast-weather/forecast-weather.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  {path:'location',component:LocationComponent},
  { path: 'forecast/:zipcode', component: ForecastWeatherComponent },
  {path: '', redirectTo: 'location', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
