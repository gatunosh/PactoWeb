import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent{

  notFound = false;
  user: UsuarioModel;

  constructor(private _auth: LoginService, private _router: Router, private _http: HttpClient, private _userService: UsuarioService) { }

  getUser(){
    this.notFound = false;
    this.user = null;

    this._userService.getUser().subscribe((userFromApi : UsuarioModel) => {
      this.user = userFromApi;
    }, (err: any) => {
        console.error(err);
        this.notFound = true;
    });
  }

  salir() {
    this._auth.logout();
    this._router.navigateByUrl('/login');
  }

}
