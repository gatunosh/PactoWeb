import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductosModel, Producto} from '../models/productos.models';
import { ThrowStmt } from '@angular/compiler';


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

    deleteProducts(id:string):Observable<any>{
        return this._http.delete(`${this.url}/producto/${id}`);
      }

    

    /*postProductos(){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        console.log(this.prodToken);
        
        return this._http.post(`${this.url}/producto`,{headers});

    }*/

    

}