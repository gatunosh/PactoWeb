import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductosModel, Producto} from '../models/productos.models';

@Injectable({
    providedIn: 'root'
})
export class ProductosService{
    prodToken: string;

    private url:string = "https://restserver-pacto.herokuapp.com";

    constructor( private http: HttpClient){}

    leerToken() {
        if (localStorage.getItem('token')) {
            this.prodToken = localStorage.getItem('token')
        }
        return this.prodToken;
    }

    getProductos(){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        console.log(this.prodToken);
        
        return this.http.get(`${this.url}/producto`,{headers});
    }

    addProductos(producto1:Producto){
        console.log(producto1.id_cat);
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        const authData={
            nom_pro: producto1.nom_pro,
            desc_pro: producto1.desc_pro,
            uni_pro: producto1.uni_pro,
            sto_pro: producto1.sto_pro,
            pvp_pro:producto1.pvp_pro,
            fecha_ela_pro: producto1.fecha_ela_pro,
            fecha_cad_pro: producto1.fecha_cad_pro
        };

        return this.http.post(`${this.url}/producto`,authData, {headers});
    }




    
    

}