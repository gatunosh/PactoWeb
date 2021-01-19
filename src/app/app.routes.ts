import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';


const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent },
    { path: '', pathMatch:'full', redirectTo:'login' },
    { path: '**', pathMatch:'full', redirectTo:'login' },
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
