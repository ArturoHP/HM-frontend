

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UnitsService {

    constructor(private http: HttpClient) {
    }

    BACK_URL: any = 'http://localhost:3002';
    //BACK_URL: any = 'http://10.0.0.11:3002';

    getAllUnits(){
        return this.http.get<any>(`${this.BACK_URL}/api/units/get_all_available_units`)
            .pipe(map(res => {
                return res;
            }));
    }

    async getUnitsByStatusAcron(status:any){
        console.log(JSON.stringify(status));
        return this.http.get<any>(`${this.BACK_URL}/api/units/get_units_by_status_acron?acrons=${JSON.stringify(status)}`)
        .pipe(map(res => {
            return res;
        }));
    }

    async updateUnit(dataToUpdate: any) {
        return this.http.post<any>(`${this.BACK_URL}/api/units/update_unit`, dataToUpdate)
            .pipe(map(res => {
                return res;
            }));
    }

    //Se tiene que actualizar la tabla  units para su respectivo status que cambie al tipo de mantenimiento
    //Se tiene que registrar el update_type y su update en la tabla unit_updates
    async updateUnitToMaintenance(dataToUpdate: any) {
        return this.http.post<any>(`${this.BACK_URL}/api/units/update_unit_to_maintenance`, dataToUpdate)
            .pipe(map(res => {
                return res;
            }));
    }

}