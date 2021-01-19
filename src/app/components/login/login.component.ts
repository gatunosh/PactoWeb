import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup

  constructor(private _router:Router, private _builder: FormBuilder) {
    this.signupForm = this._builder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  enviar(values){
    console.log(values);
  }

}
