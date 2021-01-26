import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ProductosService{

    private url:string = 'https://restserver-pacto.herokuapp.com';

    productToken: string;

    constructor(private _http: HttpClient){}

    prodToken(){
        if (localStorage.getItem('token1')) {
            this.productToken = localStorage.getItem('token1')
        }
        return this.productToken;
    }

    getProductos(){
        const headers = new HttpHeaders({
            'token1': this.prodToken()
        });
        console.log(this.productToken);
        
        return this._http.get(`${this.url}/producto`,{headers});
    }

    updateProductos(){

    }

    deleteProductos(){

    }

}