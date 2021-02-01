import { Component, OnInit, OnDestroy } from '@angular/core';
import { CapacitacionService } from '../../services/capacitacion.service';
import { Capacitacion, CapacitacionModel } from '../../models/capacitacion.models';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html'
})

export class CapacitacionComponent implements OnDestroy, OnInit{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  capacitaciones: Capacitacion[] = [];
  capacitacionesForm: FormGroup;
  capacitacion: CapacitacionModel = new CapacitacionModel();
  capacitacionUpdate: CapacitacionModel = new CapacitacionModel();

  constructor(
    private _capacitacionService: CapacitacionService,
    private _builder: FormBuilder,
    private _router: Router,
    private activerouter:ActivatedRoute,
    ){}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      "language": {
        url: "//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
      }
    };
//GET DATA
    this._capacitacionService.getCapacitaciones().subscribe((resp:any) => {
      this.capacitaciones = resp.capacitacion;
      this.dtTrigger.next();
    });

  }

    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }
}