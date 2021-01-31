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
  selector: 'app-asociacion',
  templateUrl: './asociacion.component.html',
  styles: [
  ]
})
export class AsociacionComponent implements OnDestroy,OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  usuarios: Asociacion[] = [];
  usersForm: FormGroup;
  asociacion: AsociacionModel = new AsociacionModel();
  asociacionUpdate: AsociacionModel = new AsociacionModel();
  constructor(
    private _userService: AsociacionService,
    private _builder: FormBuilder
  ) { 
    this.usersForm = this._builder.group({
      email: ['',],
      password: ['',],
      nombre: ['',],
      apellido: ['',],
      tlfc: ['',],
      tlfm: ['',],
      hectareas: ['',],
      sector: ['',],
      parroquia: ['',],
      barrio: ['',],
      role: ['',]
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

    this._userService.getUsers().subscribe((resp:any) => {
      this.usuarios = resp.usuarios;
      this.dtTrigger.next();
    });
  }



  enviar(values){
    this.asociacion.nombre_aso = values['nombre_aso'];
    this.asociacion.certificado_aso = values['certificado_aso'];
    this.asociacion.sector_aso = values['sector_aso'];
    this.asociacion.barrio_aso = values['barrio_aso'];
    this.asociacion.parroquia_aso = values['parroquia_aso'];
  
    this._userService.addUsers(this.asociacion).subscribe((resp:any) => {
      this.asociacion = resp.asociacion;
      window.location.reload()
      
    }, (err) => {
    });
  }

  openModalActualizar(id:string) {
    this.asociacionUpdate = this.buscadorUserActual(id);
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

    this._userService.updateUser(this.asociacionUpdate).subscribe(resp => {
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

  buscadorUserActual(id:string){
      let userActual: Asociacion;
      
      for (let i = 0; i < this.usuarios.length; i++) {
        if(this.usuarios[i].id_soc == id){
          userActual = this.usuarios[i];
          break;
        }
      }

      return userActual;
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

    this._userService.deleteUser(this.asociacionUpdate).subscribe(resp => {
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
