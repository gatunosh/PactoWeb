import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  constructor(private _auth: LoginService, private _router: Router) { }

  ngOnInit(): void {
  }

  salir() {
    this._auth.logout();
    this._router.navigateByUrl('/login');
  }

}