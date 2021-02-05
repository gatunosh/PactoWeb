import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mantenimiento } from '../models/mantenimiento.models';


@Injectable({
    providedIn: 'root'
})
export class MantenimientoService {

    //mantenimientos: Mantenimiento []= [];

    private url: string = 'https://restserver-pacto.herokuapp.com';

    manToken: string;

    constructor(private _http: HttpClient) { }

    leerToken() {
        if (localStorage.getItem('token')) {
            this.manToken = localStorage.getItem('token')
        }
        return this.manToken;
    }

    getMantenimiento() {
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        console.log(this.manToken);
        return this._http.get(`${this.url}/mantenimientomaqsocio`,{headers});
    }

    addMantenimiento(mantenimiento1:Mantenimiento){
    console.log(mantenimiento1);
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
       
        const authData = {
            fech_man_maq: mantenimiento1.fech_man_maq,
            tipo_man_maq: mantenimiento1.tipo_maq,
            des_man_maq: mantenimiento1.des_man_maq,
            check_man_maq: mantenimiento1.check_man_maq,
            costo_man_maq: mantenimiento1.costo_man_maq,
            proximo_man_maq: mantenimiento1.proximo_man_maq,
            marca_man_maq: mantenimiento1.marca_man_maq,
            km_man_maq: mantenimiento1.km_man_maq,
            placa_man_maq: mantenimiento1.placa_man_maq,
            origen_man_maq: mantenimiento1.origen_man_maq
        };
        return this._http.post(`${this.url}/mantenimientomaqsocio`,authData, {headers});
    }
}
