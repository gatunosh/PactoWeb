import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductosModel, Producto} from '../models/productos.models';

@Injectable({
    providedIn: 'root'
})
export class ProductosService{

    productos: Producto[] = [];

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

    addProductos(producto1:Producto){
        console.log(producto1.nom_pro);
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        const authData={
            id_cat:producto1.id_cat,
            nom_pro: producto1.nom_pro,
            desc_pro: producto1.desc_pro,
            uni_pro: producto1.uni_pro,
            sto_pro: producto1.sto_pro,
            pvp_pro:producto1.pvp_pro,
            fecha_ela_pro: producto1.fecha_ela_pro,
            fecha_cad_pro: producto1.fecha_cad_pro
        };
        return this._http.post(`${this.url}/producto`,authData, {headers});
    }

    updateProductos(producto1:Producto){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });

        const authData = {
            id_cat:producto1.id_cat,
            nom_pro: producto1.nom_pro,
            desc_pro: producto1.desc_pro,
            uni_pro: producto1.uni_pro,
            sto_pro: producto1.sto_pro,
            pvp_pro:producto1.pvp_pro,
            fecha_ela_pro: producto1.fecha_ela_pro,
            fecha_cad_pro: producto1.fecha_cad_pro
        };
        return this._http.put(`${this.url}/producto/${producto1._id}`,authData,{headers});
    }

    deleteProductos(producto1:Producto){
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });  
        return this._http.delete(`${this.url}/producto/${producto1._id}`,{headers});
     }   
}
