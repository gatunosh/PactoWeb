import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import {CapacitacionComponent} from './components/capacitacion/capacitacion.component';
import {AsiscapacitacionComponent} from './components/asiscapacitacion/asiscapacitacion.component';


//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { ProductosComponent } from './components/productos/productos.component';

// Routes
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    CapacitacionComponent,
    AsiscapacitacionComponent,
    ProductosComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
