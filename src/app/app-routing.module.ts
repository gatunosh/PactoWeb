import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';
import { UsersComponent } from './components/users/users.component';


const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent },
    { path: 'productos',component: ProductosComponent},
    { path: '', pathMatch:'full', redirectTo:'login' },
    { path: '**', pathMatch:'full', redirectTo:'login'},
];


@NgModule({
    imports: [ RouterModule.forRoot(APP_ROUTES) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

