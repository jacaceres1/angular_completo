import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Usuario} from '../../models/direcciones.model';
@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiURL = environment.apiURL;

  constructor(private httpClient: HttpClient) { }

  /**obtener todos los pedidos */
  getPedidos(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.apiURL}/orders/`);
  }

  getOrderById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/orders/${id}`);
  }

  // Agregar producto al carrito
  addToCart(userId: number, productId: number): Observable<any> {
    const body = { userId, productId };
    return this.httpClient.post<any>(`${this.apiURL}/orders/add-to-cart`, body);
  }

  // Eliminar producto del carrito por su ID
  deleteFromCart(pedidoDetalleId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/orders/delete-from-cart/${pedidoDetalleId}`);
  }

  //obtener la dirección he información del cliente
  getUsuarioConDirecciones(orderId: number): Observable<{ usuario:  Usuario}> {
    return this.httpClient.get<{ usuario: Usuario }>(`${this.apiURL}/orders/direccion/${orderId}`);
  }
}
