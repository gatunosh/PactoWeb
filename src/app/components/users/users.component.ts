import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UsuarioModel, Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit{

  usuarios: Usuario[] = [];

  constructor(private _auth: LoginService, private _router: Router, private _http: HttpClient, private _userService: UsuarioService) {
    this.getUsers();
  }

  ngOnInit(): void {

  }

  getUsers(){
    this._userService.getUsers().subscribe((resp:any) => {
      this.usuarios = resp.usuarios;
      console.log(this.usuarios);
    });
  }


}
