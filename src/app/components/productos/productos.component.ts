import { Component, OnInit, Input,OnDestroy } from '@angular/core';
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
export class ProductosComponent implements OnDestroy,OnInit {

  @Input() producto: any =null;

  private url:string = 'https://restserver-pacto.herokuapp.com';
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  productos: Producto[] = [];
  productosForm: FormGroup;
  producto1: ProductosModel = new ProductosModel();
  productoUpdate: ProductosModel = new ProductosModel();

  constructor(private _auth: LoginService, private _router: Router, private _http: HttpClient, private _productosService:ProductosService,private activerouter:ActivatedRoute,private _builder: FormBuilder) { 
    this.productosForm = this._builder.group({
      id_cat:[''],
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
      pageLength: 10,
      "language": {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    };

    this._productosService.getProductos().subscribe((res:any) =>{
      this.productos= res.producto;

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
      this.productos = resp.producto1;
      window.location.reload()
      
    }, (err) => {
      console.log(err);
    });
  }

  openModalActualizar(id:string) {
    this.productoUpdate = this.buscadorProductoActual(id);
  }

  onEdit( form:NgForm ) {
    if (form.invalid) {return;}

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });

    Swal.showLoading();

    this._productosService.updateProductos(this.productoUpdate).subscribe(resp => {
      Swal.close();
      window.location.reload();
    },(err) => {
      Swal.fire({
        title: 'Error',
        text: err.error.err.message,
        icon: 'error',
      });
    });
  }

  buscadorProductoActual(id:string){
    let productoActual: Producto;
    
    for (let i = 0; i < this.productos.length; i++) {
      if(this.productos[i]._id == id){
        productoActual = this.productos[i];
        break;
      }
    }

    return productoActual;
}



  onClick(producto){
    this.producto=producto;
  }

  delete() {
    Swal.fire({
      title: 'Espere',
      text: 'Borrando Información',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });

    Swal.showLoading();

    this._productosService.deleteProductos(this.productoUpdate).subscribe(resp => {
      Swal.close();
      window.location.reload();
    },(err) => {
      Swal.fire({
        title: 'Error',
        text: err.error.err.message,
        icon: 'error',
      });
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
}





