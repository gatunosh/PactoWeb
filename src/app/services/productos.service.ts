import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProductosModel } from '../models/productos.models';


@Injectable({
    providedIn: 'root'
})
export class ProductosService{

    private url:string = 'https://restserver-pacto.herokuapp.com';

    constructor(private _http: HttpClient){}

    getProductos(){
    }

    updateProductos(){

    }

    deleteProductos(){

    }

}