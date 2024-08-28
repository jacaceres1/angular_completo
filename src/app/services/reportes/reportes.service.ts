import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Provincia, Categoria, NoVenta, UsuarioCompra } from 'src/app/models/reportes.model';
@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private apiURL: string = environment.apiURL;
  constructor(private httpClient: HttpClient) { }

  /**obtener las categorias mas vendidas */
  getCategorias(): Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(`${this.apiURL}/reportes/categorias`);
  }
  /**obtener las provincias con mas ventas */
  getProvincias(): Observable<Provincia[]>{
    return this.httpClient.get<Provincia[]>(`${this.apiURL}/reportes/provincias`);
  }

  /**obtener las prendas que no se han vendido */
  getMenosVendido(): Observable<NoVenta[]>{
    return this.httpClient.get<NoVenta[]>(`${this.apiURL}/reportes/no-ventas`);
  }

  getClienteCompra(): Observable<UsuarioCompra[]>{
    return this.httpClient.get<UsuarioCompra[]>(`${this.apiURL}/reportes/ventas`);
  }
}
