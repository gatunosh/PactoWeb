import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import { Capacitaciones } from 'src/models/capacitacion';


@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html'
})
export class CapacitacionComponent {

  //public capacitaciones: Array<Capacitaciones>;
  public paginatecapacitacion: number;

  constructor(private _http: HttpClient) { 

    this._http.get('URL API')
          .subscribe((capacitacion:any) => {
            console.log(capacitacion);
          });
  }
}
