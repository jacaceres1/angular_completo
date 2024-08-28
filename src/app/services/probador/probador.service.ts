import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProbadorService {

  private baseUrl = 'http://localhost:5000'
  constructor(private http: HttpClient) { }


}
