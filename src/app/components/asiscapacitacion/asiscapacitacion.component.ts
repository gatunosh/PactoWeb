import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asiscapacitacion',
  templateUrl: './asiscapacitacion.component.html'
})
export class AsiscapacitacionComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
 


  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
      }
    };
    this.http.get('http://dummy.restapiexample.com/api/v1/employees')
    .subscribe((res:any) => {
          console.log(res);
          //this.data = res.data;
          this.dtTrigger.next();
    });          
  }
  /*enviar(values){
    this.asiscapacitacion.nom_soc = values['tem_cap'];
    this.asiscapacitacion.ape_soc = values['fech_ini_cap'];
    this.asiscapacitacion.asis_cap = values['fech_fin_capi'];

    this._AsisCapacitacionService.addCapacitaciones(this.asiscapacitacion).subscribe((resp:any) => {
      this.asiscapacitaciones = resp.capacitacion;
      window.location.reload()
      
    }, (err) => {
    });
  }

  openModalActualizar(id:string) {
    this.asiscapacitacionUpdate = this.buscadorCapacitacionActual(id);
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

    this._asiscapacitacionService.updateAsisCapacitacion(this.asiscapacitacionUpdate).subscribe(resp => {
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
  
  buscadorCapacitacionActual(id:string){
    let asiscapacitacionActual: AsisCapacitacion;
    
    for (let i = 0; i < this.asiscapacitaciones.length; i++) {
      if(this.asiscapacitaciones[i]._id == id){
        asiscapacitacionActual = this.asiscapacitaciones[i];
        break;
      }
    }

    return asiscapacitacionActual;
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

      this._asiscapacitacionService.deleteCapacitacion(this.asiscapacitacionUpdate).subscribe(resp => {
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


*/
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

