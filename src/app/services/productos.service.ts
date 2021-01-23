import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductosService{

   constructor(private _http: HttpClient){}

   getProductos(){
        const headers = new HttpHeaders({

        });

        return this._http.get('', {headers});
   }
}