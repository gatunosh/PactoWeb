import { Component, OnInit,OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DirectivasService } from 'src/app/services/directivas.service';
import { DirectivasModel, Directiva} from '../../models/directivas.models';
import { AsociacionesModel, Asociacion} from '../../models/asociaciones.models';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import { AsociacionesService } from '../../services/asociaciones.service';

@Component({
  selector: 'app-directivas',
  templateUrl: './directivas.component.html'
})
export class DirectivasComponent implements OnDestroy,OnInit {

  private url:string = 'https://restserver-pacto.herokuapp.com';
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  asociaciones: Asociacion[] = [];
  directivas: Directiva[] = [];
  directivasForm: FormGroup;
  directiva1: DirectivasModel = new DirectivasModel();
  directivaUpdate: DirectivasModel = new DirectivasModel();

  constructor(private _auth: LoginService,
     private _router: Router,
      private _http: HttpClient,
       private _directivasService:DirectivasService,
       private _asociacionService:AsociacionesService,
       private activerouter:ActivatedRoute,
       private _builder: FormBuilder) { 
    this.directivasForm = this._builder.group({
      
      cargo_dir: ['',],
      nom_dir: ['',],
      ape_dir: ['',],
      periodo_dir: ['',],
      id_asociacion: ['',],
      
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      "language": {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    };

    this._directivasService.getDirectivas().subscribe((res:any) =>{
      this.directivas= res.directiva;
      this.dtTrigger.next();
    });

    this._asociacionService.getAsociaciones().subscribe((res:any) =>{
      
      this.asociaciones= res.asociacion;
      console.log(this.asociaciones);
      //this.dtTrigger.next();
    });
  }

  enviar(values){
    this.directiva1.cargo_dir = values['cargo_dir'];
    this.directiva1.nom_dir = values['nom_dir'];
    this.directiva1.ape_dir = values['ape_dir'];
    this.directiva1.periodo_dir = values['periodo_dir'];
    this.directiva1.id_asociacion=[{id_soc:values['id_soc'],_id:""}];
    
   
    this._directivasService.addDirectivas(this.directiva1).subscribe((resp:any) => {
      this.directivas = resp.directiva1;
      console.log(resp.directivas);
      window.location.reload()
      
    }, (err) => {
      console.log(err);
    });
  }

  openModalActualizar(id:string) {
    this.directivaUpdate = this.buscadorDirectivaActual(id);
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

    this._directivasService.updateDirectivas(this.directivaUpdate).subscribe(resp => {
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

  buscadorDirectivaActual(id:string){
    let directivaActual: Directiva;
    
    for (let i = 0; i < this.directivas.length; i++) {
      if(this.directivas[i]._id == id){
        directivaActual = this.directivas[i];
        break;
      }
    }

    return directivaActual;
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

    this._directivasService.deleteDirectivas(this.directivaUpdate).subscribe(resp => {
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



