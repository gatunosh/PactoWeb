import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  constructor(private _auth: LoginService, private _router: Router, private _http: HttpClient) { }

  ngOnInit(): void {
  }

  salir() {
    this._auth.logout();
    this._router.navigateByUrl('/login');
  }

}
