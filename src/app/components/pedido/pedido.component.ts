import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PedidoService } from '../../services/pedido.service';
import { ProductosModel, Producto} from '../../models/productos.models';
import { PedidoModel, Pedido} from '../../models/pedido.models';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import Swal from 'sweetalert2';


//import { Person } from '../person';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
})

export class PedidoComponent implements OnInit, OnDestroy{

  // los datos se van guardando en un arreglo, el cual se usa para
  // desplegar la tabla
  personas:any[] = [];

  // los input del formulario se asocian con un modelo
  persona:any = {};



  guardar(){
    // se inserta el dato en el arreglo
    this.personas.push(this.persona);

    // se crea un nuevo objeto para almacenar nuevos datos
    this.persona = {};
  }


  @Input() pedido: any =null;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  pedidos: Pedido[] = [];
  productos: Producto[] = [];
  productosForm: FormGroup;
  pedidosForm: FormGroup;
  producto1: ProductosModel = new ProductosModel();
  pedido1: PedidoModel = new PedidoModel();
  //pedidoUpdate: PedidoModel = new PedidoModel();

  constructor(
    private _auth: LoginService,
    private _router: Router,
    private _http: HttpClient,
    private _pedidoService:PedidoService,
    private activerouter:ActivatedRoute,
    private _builder: FormBuilder){
    this.pedidosForm = this._builder.group ({
      id_cli: ['',],
      fec_fac:['',],
      tot_fac: ['',],
      estado: ['',],
      detalle: ['',],
     });
     this.productosForm = this._builder.group({
      nombre: ['',Validators.required],
      descripcion: ['',],
    });
   } 

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
      }
    };

    this._pedidoService.getPedidos().subscribe((resp:any) => {
      this.pedidos = resp.factura;
      console.log(this.pedidos);
      this.dtTrigger.next();
    });
    this._pedidoService.getProductos().subscribe((res:any) =>{
      this.productos= res.producto;
      console.log(this.productos);
      this.dtTrigger.next();
    });
       
  }
  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  /*enviar(values){
    this.pedido.id_cli = values['id_cli'];
    this.pedido.fec_fac = values['fec_fac'];
    this.pedido.tot_fac = values['tot_fac'];
    this.pedido.estado = values['estado'];
    this.pedido.detalle = values['detalle'];
    this._pedidoService.addPedido(this.pedido1).subscribe((resp:any) => {
      this.pedidos = resp.pedidos;
      window.location.reload();

    }, (err) => {

    });
  }*/
}


