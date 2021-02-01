import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Asociacion, AsociacionModel } from '../../models/asociacion.models';
import { AsociacionService } from '../../services/asociacion.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asociaciones',
  templateUrl: './asociaciones.component.html',
  styles: [
  ]
})
export class AsociacionesComponent implements OnDestroy, OnInit{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  asociaciones: Asociacion[] = [];
  asociacionesForm: FormGroup;
  asociacion: AsociacionModel = new AsociacionModel();
  asociacionUpdate: AsociacionModel = new AsociacionModel();

  constructor(
    private _asociacionService: AsociacionService,
    private _builder: FormBuilder
    ){
    this.asociacionesForm = this._builder.group({
      nombre_aso: ['',],
      certificado_aso: ['',],
      sector_aso: ['',],
      barrio_aso: ['',],
      parroquia_aso: ['',]
     
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

    this._asociacionService.getAsociaciones().subscribe((resp:any) => {
      this.asociaciones = resp.asociacion;
      this.dtTrigger.next();
    });

  }

  enviar(values){
    this.asociacion.nombre_aso = values['nombre_aso'];
    this.asociacion.certificado_aso = values['certificado_aso'];
    this.asociacion.sector_aso = values['sector_aso'];
    this.asociacion.barrio_aso = values['barrio_aso'];
    this.asociacion.parroquia_aso = values['parroquia_aso'];
   
    this._asociacionService.addAsociaciones(this.asociacion).subscribe((resp:any) => {
      this.asociaciones = resp.asociaciones;
      window.location.reload()
      
    }, (err) => {
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

    this._asociacionService.updateUser(this.asociacionUpdate).subscribe(resp => {
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

  delete() {
    Swal.fire({
      title: 'Espere',
      text: 'Borrando Información',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });

    Swal.showLoading();

    this._asociacionService.deleteUser(this.asociacionUpdate).subscribe(resp => {
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
