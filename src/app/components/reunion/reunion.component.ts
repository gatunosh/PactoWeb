import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Reuniones, ReunionesModel } from '../../models/reunion.models';
import { ReunionService } from '../../services/reunion.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html'
})
export class ReunionComponent implements OnInit, OnDestroy {
  @Input() reunion: any =null;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  reuniones: Reuniones[] = [];
  reunionesForm: FormGroup;
  reunion1: ReunionesModel = new ReunionesModel();
  //usuarioUpdate: UsuarioModel = new UsuarioModel();

  constructor(
    private _reunionService: ReunionService,
    private _builder: FormBuilder

  ) { this.reunionesForm = this._builder.group({
    id_asoc_reu:[''],
    fec_reu: ['',],
    hor_reu: ['',],
    mul_reu: ['',],
    
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

    this._reunionService.getReunion().subscribe((resp:any) => {
      this.reuniones = resp.reuniones;
      this.dtTrigger.next();
    });

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

}
enviar(values){
  this.reunion.id_asoc_reu = values['id_asoc_reu'];
  this.reunion.fec_reu = values['fec_reu'];
  this.reunion.hor_reu = values['hor_reu'];
  this.reunion.mul_reu = values['mul_reu'];
  this._reunionService.addReunion(this.reunion1).subscribe((resp:any) => {
    this.reuniones = resp.reuniones;
    window.location.reload()
    
  }, (err) => {
  });
}
}

