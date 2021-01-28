import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html'
})

export class CapacitacionComponent implements OnDestroy, OnInit{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any; 

  constructor(private http: HttpClient){}

     //SUBMIT DATA
        onSubmit(data)
        {
        this.http.post('URL',data)
        .subscribe((result)=>
            {
              console.warn("result",result)
            })
            console.warn(data);
        }
      //SUBMIT END
          edit(obj,index)
          {

          }


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
          this.data = res.data;
          this.dtTrigger.next();
    });          
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();


  }

  
/*PUT DATA OK 
onSubmit(data){
  console.warn(data);
}*/



/*PUT DATA 2
  onSubmit(data){
    if(this.activeindex==-1){
      console.log(this.CapacitacionModel);

    }else{
      this.homerray.splice(this.activeindex,1,this.CapacitacionModel);
    }
    
  }
  this.CapacitacionModel=new CapacitacionModel();
    this.title='Submit';
    this.activeindex=-1;*/
}