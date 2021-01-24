import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductosModel, Producto } from '../../models/productos.models';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private _auth: LoginService, private _router: Router, private _http: HttpClient, public _productosService:ProductosService) { 
    this.getProductos();
  }


  ngOnInit(): void {
    
  }

  getProductos(){
    /*this._productosService.getProductos().subscribe((res:any) =>{
      this.productos= res.productos;
      console.log(this.productos);
    });*/
  }


  salir() {
    this._auth.logout();
    this._router.navigateByUrl('/login');
  }

}
