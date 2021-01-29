import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Usuario, UsuarioModel } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnDestroy, OnInit{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  usuarios: Usuario[] = [];
  usersForm: FormGroup;
  usuario: UsuarioModel = new UsuarioModel();
  usuarioUpdate: UsuarioModel = new UsuarioModel();

  constructor(
    private _userService: UsuarioService,
    private _builder: FormBuilder
    ){
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
    this.usuario.nombre = values['nombre'];
    this.usuario.apellido = values['apellido'];
    this.usuario.tlfc = values['tlfc'];
    this.usuario.email = values['email'];
    this.usuario.password = values['password'];
    this.usuario.tlfm = values['tlfm'];
    this.usuario.hectareas = values['hectareas'];
    this.usuario.sector = values['sector'];
    this.usuario.barrio = values['barrio'];
    this.usuario.parroquia = values['parroquia'];
    this.usuario.role = values['role'];
    this._userService.addUsers(this.usuario).subscribe((resp:any) => {
      this.usuarios = resp.usuarios;
      window.location.reload()
      
    }, (err) => {
      console.log(err);
    });
  }

  openModalActualizar(id:string) {
    this.usuarioUpdate = this.buscadorUserActual(id);
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

    this._userService.updateUser(this.usuarioUpdate).subscribe(resp => {
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
      let userActual: Usuario;
      
      for (let i = 0; i < this.usuarios.length; i++) {
        if(this.usuarios[i]._id == id){
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

    this._userService.deleteUser(this.usuarioUpdate).subscribe(resp => {
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
