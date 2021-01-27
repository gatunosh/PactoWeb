import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

/*export class CapacitacionService {

    private url: string = '';

   userCapacitacion: string;

    constructor (private _http: HttpClient) { }

    leerToken() {
        if (localStorage.getItem('token')) {
            this.userCapacitacion = localStorage.getItem('token')
        }
        return this.userCapacitacion;
    }

    getCapacitaciones(){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        console.log(this.userCapacitacion);

        return this._http.get(`${this.url}/usuario`,{headers});
    }

}*/