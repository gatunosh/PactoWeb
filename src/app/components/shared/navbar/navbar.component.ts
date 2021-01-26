import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(private _auth: LoginService, private _router: Router) { }

  ngOnInit(): void {
  }

    salir() {
      this._auth.logout();
      this._router.navigateByUrl('/login');
    }

    goproducts(){
      this._router.navigateByUrl('/productos');
    }
/*
    gousuarios(){
      this._router.navigateByUrl('/users');
    }

    gocapacitacion(){
      this._router.navigateByUrl('/capacitacion');
    }

    goentidad(){
      this._router.navigateByUrl('/entidad');
    }*/
}
