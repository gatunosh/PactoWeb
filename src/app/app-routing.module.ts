import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { CapacitacionComponent } from './components/capacitacion/capacitacion.component';
import { AsiscapacitacionComponent } from './components/asiscapacitacion/asiscapacitacion.component';
import { EntidadComponent } from './components/entidad/entidad.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { DetallepedidoComponent } from './components/detallepedido/detallepedido.component';
import { PedidoadminComponent } from './components/pedidoadmin/pedidoadmin.component';
import { BodegaComponent } from './components/bodega/bodega.component';
import { ReunionComponent } from './components/reunion/reunion.component';
import { AsisreunionComponent } from './components/asisreunion/asisreunion.component';
import { MaquinarianComponent } from './components/maquinarian/maquinarian.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { MaquinariaasoComponent } from './components/maquinariaaso/maquinariaaso.component';
import { MantenimientoasoComponent } from './components/mantenimientoaso/mantenimientoaso.component';


const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'productos',component: ProductosComponent, canActivate: [AuthGuard] },
    { path: 'capacitacion',component:CapacitacionComponent },
    { path: 'asiscapacitacion/:id',component:AsiscapacitacionComponent },
    { path: 'entidad',component:EntidadComponent },
    { path: 'pedido',component: PedidoComponent },
    { path: 'detallepedido/:id',component: DetallepedidoComponent },
    { path: 'pedidoadmin',component: PedidoadminComponent },
    { path: 'bodega',component: BodegaComponent },
    { path: 'reunion',component: ReunionComponent } ,
    { path: 'asisreunion/:id',component: AsisreunionComponent },
    { path: 'maquinaria',component: MaquinarianComponent },
    { path: 'mantenimiento/:id',component: MantenimientoComponent },
    { path: 'maquinariaaso',component: MaquinariaasoComponent },
    { path: 'mantenimientoaso/:id',component: MantenimientoasoComponent },
    { path: '', pathMatch:'full', redirectTo:'login' },
    { path: '**', pathMatch:'full', redirectTo:'login'},
];


@NgModule({
    imports: [ RouterModule.forRoot(APP_ROUTES) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
