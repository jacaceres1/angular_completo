import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HeaderComponent } from './componentes/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductosService } from './services/productos/productos.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductoEspecificoComponent } from './pages/producto-especifico/producto-especifico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductoComponent } from './pages/productos_crud/add-producto/add-producto.component';
import { ListProductoComponent } from './pages/productos_crud/list-producto/list-producto.component';
import { EditProductoComponent } from './pages/productos_crud/edit-producto/edit-producto.component';
import { ConfirmDialogComponent } from './componentes/confirm-dialog/confirm-dialog.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PagoComponent } from './pages/pago/pago.component';
import { EditOrdenComponent } from './pages/ordenes-crud/edit-orden/edit-orden.component';
import { ListOrdenComponent } from './pages/ordenes-crud/list-orden/list-orden.component';
import { PagoValidarComponent } from './pages/pago-validar/pago-validar.component';
import { ProbadorComponent } from './pages/probador/probador.component';
import { LogoutComponent } from './componentes/logout/logout.component';
import { CarritoAddComponent } from './componentes/carrito-add/carrito-add.component';
import { ConfirmCarritoComponent } from './componentes/confirm-carrito/confirm-carrito.component';
import { TransaccionComponent } from './pages/transaccion/transaccion.component';
import { ListCategoriaComponent } from './pages/categorias-crud/list-categoria/list-categoria.component';
import { AddCategoriaComponent } from './pages/categorias-crud/add-categoria/add-categoria.component';
import { EditCategoriaComponent } from './pages/categorias-crud/edit-categoria/edit-categoria.component';
import { ConfirmTransaccionComponent } from './componentes/confirm-transaccion/confirm-transaccion.component';
import { ListTransComponent } from './pages/transaccion-crud/list-trans/list-trans.component';
import { VerificaTransComponent } from './pages/transaccion-crud/verifica-trans/verifica-trans.component';
import { VerificarDireccionComponent } from './pages/transaccion-crud/verificar-direccion/verificar-direccion.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { NgChartsModule   } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProductoEspecificoComponent,
    AddProductoComponent,
    ListProductoComponent,
    EditProductoComponent,
    ConfirmDialogComponent,
    CarruselComponent,
    CarritoComponent,
    PagoComponent,
    EditOrdenComponent,
    ListOrdenComponent,
    PagoValidarComponent,
    ProbadorComponent,
    LogoutComponent,
    CarritoAddComponent,
    ConfirmCarritoComponent,
    TransaccionComponent,
    ListCategoriaComponent,
    AddCategoriaComponent,
    EditCategoriaComponent,
    ConfirmTransaccionComponent,
    ListTransComponent,
    VerificaTransComponent,
    VerificarDireccionComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
  ],
  providers: [
    ProductosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
