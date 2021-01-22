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
    baseURL = environment.apiURL + 'users/';

    userToken: string;

    constructor(private _http: HttpClient) {}

    getUser(): Observable<UsuarioModel> {
      const url = this.baseURL;
      return this._http.get<UsuarioModel>(url);
    }

}
