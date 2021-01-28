import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductosModel, Producto} from '../../models/productos.models';
import { Subject } from 'rxjs';
//import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  @Input() producto: any =null;

  private url:string = 'https://restserver-pacto.herokuapp.com';
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  productos: Producto[] = [];

  constructor(private _auth: LoginService, private _router: Router, private _http: HttpClient, public _productosService:ProductosService,private activerouter:ActivatedRoute) { 
  }


  ngOnInit(): void {
    let productoid = this.activerouter.snapshot.paramMap.get('id');
    console.log(productoid);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      "language": {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    };

    this._productosService.getProductos().subscribe((res:any) =>{
      this.productos= res.productos;
      console.log(this.productos);

      this.dtTrigger.next();
    });
  }

  /*deleteProducts(id){
    console.log("Eliminado"+id);
    this._productosService.deleteProducts(id).subscribe(data=>{
      console.log(data);
    });

  }*/

  onClick(producto){
    this.producto=producto;
  }
  
}





