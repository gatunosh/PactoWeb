import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { NgxPaginationModule } from 'ngx-pagination';


//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { ProductosComponent } from './components/productos/productos.component';
import { EntidadComponent } from './components/entidad/entidad.component';
import { CapacitacionComponent } from './components/capacitacion/capacitacion.component';
import { AsiscapacitacionComponent } from './components/asiscapacitacion/asiscapacitacion.component';

// Routes
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { EditarComponent } from './components/editar/editar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    CapacitacionComponent,
    AsiscapacitacionComponent,
    ProductosComponent,
    EntidadComponent,
    NavbarComponent,
    NuevoComponent,
    EditarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
