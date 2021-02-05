import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import {UsersComponent } from '../../users/users.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;
  isAdmin: boolean = false;
  isSocio: boolean = false;
  name:string;

  constructor(private _auth: LoginService, private _router: Router) { 
    if(localStorage.getItem('token')){
      this.isLogin = true;
      if (localStorage.getItem('role') === '1') {  
          this.isAdmin = true;          
      }
    }
  }

  ngOnInit(): void {
  }

    salir() {
      this._auth.logout();
      this._router.navigateByUrl('/login');
    }
}
