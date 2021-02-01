import { Component, OnInit, Input,OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AsociacionesService } from 'src/app/services/asociaciones.service';
import { AsociacionesModel, Asociacion} from '../../models/asociaciones.models';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asociaciones',
  templateUrl: './asociaciones.component.html'
})
export class AsociacionesComponent implements OnDestroy,OnInit {

  @Input() asociacion: any =null;

  private url:string = 'https://restserver-pacto.herokuapp.com';
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  asociaciones: Asociacion[] = [];
  asociacionesForm: FormGroup;
  asociacion1: AsociacionesModel = new AsociacionesModel();
  asociacionUpdate: AsociacionesModel = new AsociacionesModel();

  constructor(private _auth: LoginService, private _router: Router, private _http: HttpClient, private _asociacionesService:AsociacionesService,private activerouter:ActivatedRoute,private _builder: FormBuilder) { 
    this.asociacionesForm = this._builder.group({
      id_soc:[''],
      nombre_aso: ['',],
      certificado_aso: ['',],
      sector_aso: ['',],
      barrio_aso: ['',],
      parroquia_aso: ['',],
      
    });
  }

  ngOnInit(): void {
    let asociacionid = this.activerouter.snapshot.paramMap.get('id');
    console.log(asociacionid);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      "language": {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    };

    this._asociacionesService.getAsociaciones().subscribe((res:any) =>{
      this.asociaciones= res.asociacion;
      this.dtTrigger.next();
    });
  }

  enviar(values){
    this.asociacion1.id_soc = values['id_soc'];
    this.asociacion1.nombre_aso = values['nombre_aso'];
    this.asociacion1.certificado_aso = values['certificado_aso'];
    this.asociacion1.sector_aso = values['sector_aso'];
    this.asociacion1.barrio_aso = values['barrio_aso'];
    this.asociacion1.parroquia_aso = values['parroquia_aso'];
   
    this._asociacionesService.addAsociaciones(this.asociacion1).subscribe((resp:any) => {
      this.asociaciones = resp.asociacion1;
      console.log(resp.asociaciones);
      window.location.reload()
      
    }, (err) => {
      console.log(err);
    });
  }

  openModalActualizar(id:string) {
    this.asociacionUpdate = this.buscadorAsociacionActual(id);
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

    this._asociacionesService.updateAsociaciones(this.asociacionUpdate).subscribe(resp => {
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

  buscadorAsociacionActual(id:string){
    let asociacionActual: Asociacion;
    
    for (let i = 0; i < this.asociaciones.length; i++) {
      if(this.asociaciones[i]._id == id){
        asociacionActual = this.asociaciones[i];
        break;
      }
    }

    return asociacionActual;
}


  onClick(asociacion){
    this.asociacion=asociacion;
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

    this._asociacionesService.deleteAsociaciones(this.asociacionUpdate).subscribe(resp => {
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



