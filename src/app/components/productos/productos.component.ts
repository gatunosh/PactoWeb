import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  constructor(private _auth: LoginService, private _router: Router, private _http: HttpClient, private _productosService:ProductosService) { }

  ngOnInit(): void {
  }

  salir() {
    this._auth.logout();
    this._router.navigateByUrl('/login');
  }

}
