import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WeatherService {

    constructor(private http: HttpClient) {
    }

    BACK_URL: any = 'http://localhost:3002';
    //BACK_URL: any = 'http://10.0.0.11:3002';

    async getLocationWeather(lat: any,lon: any){
        return this.http.get<any>(`${this.BACK_URL}/api/weather/get_location_weather?lat=${lat}&lon=${lon}`)
        .pipe(map(res => {
            return res;
        }));
    }

    
}