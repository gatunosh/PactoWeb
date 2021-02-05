import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PedidoService } from '../../services/pedido.service';
import { PedidoModel, Pedido} from '../../models/pedido.models';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

//import { Person } from '../person';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html'
})
export class PedidoComponent implements OnInit, OnDestroy{
  @Input() pedido: any =null;

  private url:string = 'https://restserver-pacto.herokuapp.com';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  pedidos: Pedido[] = [];
  pedidosForm: FormGroup;
  pedido1: PedidoModel = new PedidoModel();
  pedidoUpdate: PedidoModel = new PedidoModel();

  constructor(
    private _auth: LoginService,
    private _router: Router,
    private _http: HttpClient,
    private _pedidoService:PedidoService,
    private activerouter:ActivatedRoute,
    private _builder: FormBuilder){
    this.pedidosForm = this._builder.group ({
      id_cat: ['',],
      nom_pro:['',],
      desc_pro: ['',],
      uni_pro: ['',],
      pvp_pro: ['',],
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
      this.pedidos = resp.producto;
      console.log(resp)
      console.log(this.pedidos);
      this.dtTrigger.next();
    });
       
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}

