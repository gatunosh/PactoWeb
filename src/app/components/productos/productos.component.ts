import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductosModel, Producto} from '../../models/productos.models';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm} from '@angular/forms';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  productos: Producto[] = [];
  

  constructor(private _auth: LoginService, private _router: Router, private _http: HttpClient, private _productosService:ProductosService,private activerouter:ActivatedRoute,private _builder: FormBuilder) {

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      "language": {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    };

    this._productosService.getProductos().subscribe((resp:any)=>{
      this.productos=resp.productos;
      console.log(this.productos);  

      this.dtTrigger.next();
    });
  }  
  
}





