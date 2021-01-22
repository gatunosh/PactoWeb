import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.models';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup;

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private _router:Router, private _builder: FormBuilder, private auth: LoginService) {
    this.signupForm = this._builder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  enviar(values){
    this.usuario.email = values['email'];
    this.usuario.password = values['password'];

    Swal.fire({
      title: 'Espere',
      text: 'Cargando Información',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });

    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(resp => {
      this.usuario.role = resp['role'];
      Swal.close();
      this._router.navigateByUrl('/users');
    },(err) => {
      Swal.fire({
        title: 'Error',
        text: err.error.err.message,
        icon: 'error',
      });
    });
  }

}
