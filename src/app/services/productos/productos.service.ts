import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Productos } from 'src/app/models/productos.model';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiURL: string = environment.apiURL;

  constructor(private httpClient: HttpClient) {

  }

  /*obtener productos todos*/
  getProductos(): Observable<Productos[]> {
    return this.httpClient.get<Productos[]>(`${this.apiURL}/products`);
  }

  /**btener un producto por id */
  getProductoId(id: number): Observable<Productos> {
    return this.httpClient.get<Productos>(`${this.apiURL}/products/${id}`);
  }

  /**eliminar un producto */
  deletProducto(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.apiURL}/products/delete/${id}`);
  }

  addProducto(productoData: FormData): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/products/add`, productoData);
  }

  updateProducto(id: number, productoData: Productos): Observable<any> {
    return this.httpClient.put(`${this.apiURL}/products/update/${id}`, productoData);
  }

  updateEstadoProducto(id: number, estado: boolean): Observable<any> {
    return this.httpClient.put(`${this.apiURL}/products/update-state/${id}`, { estado });
  }
}
