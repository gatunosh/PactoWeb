import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Usuario, UsuarioModel } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private _auth: LoginService, private _router: Router, private _http: HttpClient, private _userService: UsuarioService,private _builder: FormBuilder) {
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
      pageLength: 5,
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
      
    }, (err) => {
      console.log(err);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
