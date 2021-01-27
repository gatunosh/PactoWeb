import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html'
})

export class CapacitacionComponent {

  capacitaciones:any[]=[];

  constructor(private _http: HttpClient) {

      this._http.get('https://restserver-pacto.herokuapp.com/capacitacion')
                  .subscribe((capacitaciones:any) => {
                    this.capacitaciones=capacitaciones;
                      console.log('capacitaciones');
                  });
                
  }

 
}
//https://restserver-pacto.herokuapp.com/capacitacion