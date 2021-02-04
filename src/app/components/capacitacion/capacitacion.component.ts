import { Component, OnInit, OnDestroy } from '@angular/core';
import {CapacitacionModel, Capacitacion} from '../../models/capacitacion.models'
import { CapacitacionService } from '../../services/capacitacion.service'
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html'
})

export class CapacitacionComponent implements OnDestroy, OnInit{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  capacitaciones: Capacitacion[] = [];
  capacitacionesForm: FormGroup;
  capacitacion: CapacitacionModel = new CapacitacionModel();
  capacitacionUpdate: CapacitacionModel = new CapacitacionModel();

  constructor(
    private _capacitacionService: CapacitacionService,
    private _builder: FormBuilder
    ){
      this.capacitacionesForm = this._builder.group({
        prof_cap:[{
          _id:['',],
          id_enti:['',],
      }],
        tema: ['',],
        fech_ini_cap: ['',],
        fech_fin_cap: ['',],
        hora_ini_cap: ['',],
        hora_fin_cap: ['',],
        asis_cap: [{
          _id:['',],
          id_soc:['',],
          cert_asis: ['',],
          cert_part: ['',],
      }],
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
    this._capacitacionService.getCapacitaciones().subscribe((resp:any) => {
      this.capacitaciones = resp.capacitacion;
      this.dtTrigger.next();
    });       
  }


  openModalActualizar(id:string) {
    this.capacitacionUpdate = this.buscadorCapacitacionActual(id);
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

    this._capacitacionService.updateCapacitacion(this.capacitacionUpdate).subscribe(resp => {
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


  buscadorCapacitacionActual(id:string){
    let capacitacionActual: Capacitacion;
    
    for (let i = 0; i < this.capacitaciones.length; i++) {
      if(this.capacitaciones[i]._id == id){
        capacitacionActual = this.capacitaciones[i];
        break;
      }
    }
    return capacitacionActual;
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

  this._capacitacionService.deleteCapacitacion(this.capacitacionUpdate).subscribe(resp => {
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
    this.dtTrigger.unsubscribe();
  }

}