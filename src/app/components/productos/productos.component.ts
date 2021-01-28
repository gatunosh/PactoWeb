import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductosModel, Producto} from '../../models/productos.models';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm} from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @Input() producto: any =null;
  productos: Producto[] = [];
  productosForm: FormGroup;
  producto1: ProductosModel = new ProductosModel();
  productoUpdate: ProductosModel = new ProductosModel();
  private url:string = 'https://restserver-pacto.herokuapp.com';

  constructor(private _auth: LoginService, private _router: Router, private _http: HttpClient, private _productosService:ProductosService,private activerouter:ActivatedRoute,private _builder: FormBuilder) {
    this.productosForm = this._builder.group({
      nom_pro: ['',],
      desc_pro: ['',],
      uni_pro: ['',],
      sto_pro: ['',],
      pvp_pro: ['',],
      fecha_ela_pro: ['',],
      fecha_cad_pro: ['',],
    });

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

    this._productosService.getProductos().subscribe(data=>{
      console.log(data);  
      this.dtTrigger.next();
    });
  }
  enviar(values){
    this.producto1.nom_pro = values['nom_pro'];
    this.producto1.desc_pro = values['desc_pro'];
    this.producto1.uni_pro = values['uni_pro'];
    this.producto1.sto_pro = values['sto_pro'];
    this.producto1.pvp_pro = values['pvp_pro'];
    this.producto1.fecha_ela_pro = values['fecha_ela_pro'];
    this.producto1.fecha_cad_pro = values['fecha_cad_pro'];
    this._productosService.addProductos(this.producto1).subscribe((resp:any) => {
      this.productos = resp.usuarios;
      window.location.reload()
      
    }, (err) => {
      console.log(err);
    });
  }

  onClick(producto){
    this.producto=producto;
  }



  
  
}





