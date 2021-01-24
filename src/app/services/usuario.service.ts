import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {


    private url: string = 'https://restserver-pacto.herokuapp.com';

    userToken: string;

    constructor(private _http: HttpClient) { }


    leerToken() {
        if (localStorage.getItem('token')) {
            this.userToken = localStorage.getItem('token')
        }
        return this.userToken;
    }

    getUsers() {
        const headers = new HttpHeaders({
            'token': this.leerToken()
        });
        console.log(this.userToken);
        
        return this._http.get(`${this.url}/usuario`,{headers});
    }

    updateUser(){
        
    }

    deleteUser() {
        
    }



}
