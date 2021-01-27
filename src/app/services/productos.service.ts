import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductosModel, Producto, ResponseI } from '../models/productos.models';


@Injectable({
    providedIn: 'root'
})
export class ProductosService{

    private url:string = 'https://restserver-pacto.herokuapp.com';

    prodToken: string;

    constructor(private _http: HttpClient){}

    leerToken() {
        if (localStorage.getItem('token')) {
            this.prodToken = localStorage.getItem('token')
        }
        return this.prodToken;
    }

    getProductos() {
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        console.log(this.prodToken);
        
        return this._http.get(`${this.url}/producto`,{headers});
    }

    putProductos(){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        console.log(this.prodToken);
        
        return this._http.put(`${this.url}/producto`,{headers});
    }

    /*postProductos(){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        console.log(this.prodToken);
        
        return this._http.post(`${this.url}/producto`,{headers});

    }*/

    getSingleProduct(id_cat:Observable<Producto>){

    }
    deleteProductos(from: Producto):Observable<ResponseI>{
        let direccion = this.url + "/productos";
        return this._http.delete<ResponseI>(direccion);
    }

}