import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  userlist(){
    this._router.navigate(['/users']);
  }

}
