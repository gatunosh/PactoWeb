import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';


const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'productos',component: ProductosComponent, canActivate: [AuthGuard]},
    { path: '', pathMatch:'full', redirectTo:'login' },
    { path: '**', pathMatch:'full', redirectTo:'login'},
];


@NgModule({
    imports: [ RouterModule.forRoot(APP_ROUTES) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
