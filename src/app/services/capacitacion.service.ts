import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Capacitacion } from '../models/capacitacion.models';

@Injectable({
    providedIn: 'root'
})

export class CapacitacionService {

    //private url: string = '';

    private url2: string = 'http://dummy.restapiexample.com';

    constructor (private _http: HttpClient) { }

    getCapacitaciones(){
      
        return this._http.get(`${this.url2}/api/v1/employees`);
    }

}