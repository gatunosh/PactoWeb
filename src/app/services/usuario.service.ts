import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { UsuarioModel } from "../models/usuario.models";

import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    baseURL = environment.apiURL + 'usuario';

    userToken: string;

    constructor(private _http: HttpClient) {}

    getUser(): Observable<any> {
      const url = this.baseURL;
      this.userToken = localStorage.getItem('token');
      var employees = this._http.get<UsuarioModel>(url,{headers:{token: this.userToken}});
      
      var employees = {   
        kiran: { age:30,salary:10000},  
        john: { age:35,salary:15000},  
        Tom: { age: 21, salary:5000}  
    }  
    let arr = [];  
    Object.keys(employees).map(function(key){  
        arr.push({[key]:employees[key]})  
        return arr;  
    });  
    console.log('Object=',employees)  
    console.log('Array=',arr)
    return this._http.get<UsuarioModel>(url,{headers:{token: this.userToken}});
    }

}
