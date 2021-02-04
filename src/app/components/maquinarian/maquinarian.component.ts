import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Maquinarian, MaquinarianModel } from '../../models/maquinarian.models';
import { MaquinarianService } from '../../services/maquinarian.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-maquinarian',
  templateUrl: './maquinarian.component.html'
})
export class MaquinarianComponent implements OnInit, OnDestroy {
  @Input() maquinarian: any =null;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  maquinarias: Maquinarian[] = [];
  maquinariasForm: FormGroup;
  maquinaria1: MaquinarianModel = new MaquinarianModel();
  //usuarioUpdate: UsuarioModel = new UsuarioModel();

  constructor(
    private _maquinarianService: MaquinarianService,
    private _builder: FormBuilder

  ) { this.maquinariasForm = this._builder.group({
    id_mant:[''],
    id_soc: ['',],
    tipo_maq: ['',],
    est_maq: ['',],
    

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

    this._maquinarianService.getMaquinarian().subscribe((resp:any) => {
      this.maquinarias = resp.maquinariasocio;
      console.log(this.maquinarian,'hola desde api');
      this.dtTrigger.next();
    });

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

}
/*enviar(values){
  this.reunion.id_asoc_reu = values['id_asoc_reu'];
  this.reunion.fec_reu = values['fec_reu'];
  this.reunion.hor_reu = values['hor_reu'];
  this.reunion.mul_reu = values['mul_reu'];
  this._reunionService.addReunion(this.reunion1).subscribe((resp:any) => {
    this.reuniones = resp.reuniones;
    window.location.reload()
    
  }, (err) => {
  });
}*/
}
