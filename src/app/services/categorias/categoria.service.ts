import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorias } from 'src/app/models/categorias.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiURL: string = environment.apiURL;

  constructor(private httpClient: HttpClient) { }

  getCategorias(): Observable<Categorias[]>{
    return this.httpClient.get<Categorias[]>(`${this.apiURL}/categorias`);
  }

  getCategoriaID(id: number): Observable<any>{
    return this.httpClient.get<Categorias>(`${this.apiURL}/categorias/${id}`);
  }

  deleteCategoria(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.apiURL}/categorias/delete/${id}`);
  }

  editCategoria(id: number, categoria: Categorias): Observable<any>{
    return this.httpClient.put(`${this.apiURL}/categorias/update/${id}`, categoria);
  }

  addCategoria(categoriaData: Categorias): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/categorias/add`, categoriaData);
  }
}
