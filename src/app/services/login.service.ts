import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { 
    this.leerToken();
  }

  private url:string = 'https://restserver-pacto.herokuapp.com';

  userToken: string;

  login(usuario:UsuarioModel) {
    
    const authData = {
      email: usuario.email,
      password: usuario.password
    };

    return this.http.post(
      `${this.url}/login`,authData
    ).pipe(
      map( resp => {
        console.log('ENTRO AL MAP');
        
        this.guardarToken(resp['token']);
        return resp;
      })
    )
  }


  logout() {
    localStorage.removeItem('token');
  }

  private guardarToken(token:string) {
    this.userToken = token;
    localStorage.setItem('token',token);
  }

  leerToken() {
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')
    }else {
      this.userToken = '';
    }

    return this.userToken;
  }


  isAuthenticated(): boolean {
    return this.userToken.length > 2;
  }

  
  

  
}
