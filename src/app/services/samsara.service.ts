

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SamsaraService {

    constructor(private http: HttpClient) {
    }

    BACK_URL: any = 'http://localhost:3002';
    //BACK_URL: any = 'http://10.0.0.11:3002';

    getVehiclesLocationSnapshots() {
        return this.http.get<any>(`${this.BACK_URL}/api/samsara/get_vehicles_location_snapshots`)
            .pipe(map(res => {
                return res;
            }));
    }

    getAllVehicles(){
        return this.http.get<any>(`${this.BACK_URL}/api/samsara/get_list_vehicles`)
            .pipe(map(res => {
                return res;
            }));
    }

    getVehiclesStats(){
        return this.http.get<any>(`${this.BACK_URL}/api/samsara/get_vehicles_stats`)
            .pipe(map(res => {
                return res;
            }));
    }

    getVehicleStats(vehicleId: any){
        return this.http.get<any>(`${this.BACK_URL}/api/samsara/get_vehicle_stats?vehicleId=${vehicleId}`)
            .pipe(map(res => {
                return res;
            }));
    }

    getVehicleDistanceKm(vehicleId: any){
        return this.http.get<any>(`${this.BACK_URL}/api/samsara/get_vehicle_distance_mts?vehicleId=${vehicleId}`)
            .pipe(map(res => {
                return res;
            }));
    }

    getTruckMaintenanceBySamsaraId(samsaraId: any){
        return this.http.get<any>(`${this.BACK_URL}/api/samsara/get_truck_maintenance_by_samsara_id?samsara_id=${samsaraId}`)
            .pipe(map(res => {
                return res;
            }));
    }

    /////////////////////
    //Trailers functions

    getTrailersStats(){
        return this.http.get<any>(`${this.BACK_URL}/api/samsara/get_trailers_stats`)
            .pipe(map(res => {
                return res;
            }));
    }

}