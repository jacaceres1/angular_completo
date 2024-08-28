import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductoEspecificoComponent } from './pages/producto-especifico/producto-especifico.component';
import { ListProductoComponent } from './pages/productos_crud/list-producto/list-producto.component';
import { EditProductoComponent } from './pages/productos_crud/edit-producto/edit-producto.component';
import { AddProductoComponent } from './pages/productos_crud/add-producto/add-producto.component';
import { ListOrdenComponent } from './pages/ordenes-crud/list-orden/list-orden.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { TransaccionComponent } from './pages/transaccion/transaccion.component';
import { RoutesAuthGuard } from './services/routes-auth/routes-auth.guard';
import { ListCategoriaComponent } from './pages/categorias-crud/list-categoria/list-categoria.component';
import { AddCategoriaComponent } from './pages/categorias-crud/add-categoria/add-categoria.component';
import { EditCategoriaComponent } from './pages/categorias-crud/edit-categoria/edit-categoria.component';
import { EditOrdenComponent } from './pages/ordenes-crud/edit-orden/edit-orden.component';
import { ListTransComponent } from './pages/transaccion-crud/list-trans/list-trans.component';
import { VerificaTransComponent } from './pages/transaccion-crud/verifica-trans/verifica-trans.component';
import { VerificarDireccionComponent } from './pages/transaccion-crud/verificar-direccion/verificar-direccion.component';
import { ReportesComponent } from './pages/reportes/reportes.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'producto/:id', component: ProductoEspecificoComponent },
  { path: 'list-produtos', component: ListProductoComponent },
  { path: 'editar-productos/:id', component: EditProductoComponent },
  { path: 'agregar-productos', component: AddProductoComponent },
  { path: 'ordenes', component: ListOrdenComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'transación/:id', component: TransaccionComponent },
  { path: 'list-categoria', component: ListCategoriaComponent },
  { path: 'add-categoria', component: AddCategoriaComponent },
  { path: 'edit-categoria/:id', component: EditCategoriaComponent },
  { path: 'orden-detallada/:id', component: EditOrdenComponent },
  { path: 'list-transacciones', component: ListTransComponent},
  { path: 'verificar-transaccion/:id1', component: VerificaTransComponent},
  { path: 'verifica-direccion/:id', component: VerificarDireccionComponent},
  { path: 'reportes', component: ReportesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}

