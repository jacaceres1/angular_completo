import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from 'src/app/models/transacciones.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private apiURL: string = environment.apiURL;
  constructor(private httpClient: HttpClient) { }

  /**obtener todas las transacciones */
  getTransacciones(): Observable<Transaccion[]>{
    return this.httpClient.get<Transaccion[]>(`${this.apiURL}/transacciones`);
  }

  addTransaccion(transaccionData: FormData): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/transacciones/add`, transaccionData);
  }

  updateEstadoTransaccion(id: number, estado: boolean): Observable<any>{
    return this.httpClient.put(`${this.apiURL}/transacciones/update-state/${id}`, { estado });
  }
}
