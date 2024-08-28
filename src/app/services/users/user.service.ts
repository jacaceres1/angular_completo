import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse, User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<any>{
    return this.http.post(`${this.apiURL}/users/add`, user);
  }

  loginUser(correo: string, contrasenia: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiURL}/auth/login`, { correo, contrasenia }).pipe(
      tap(response => {
        console.log('respuesta', response)
        this.setLoggedInUser(response);
      })
    );
  }

  getLoggedInUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  setLoggedInUser(response: LoginResponse) {
    const { token, email, userId, userRol} = response;
    const expirationDate = new Date().getTime() + 4 * 60 * 60 * 1000; // 4 horas
    localStorage.setItem('user', JSON.stringify(email));
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRol', userRol)
    this.setLogoutTimer(4 * 60 * 60 * 1000); // 4 horas en milisegundos

  }

  clearLoggedInUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRol');
  }

  private setLogoutTimer(duration: number) {
    setTimeout(() => {
      this.clearLoggedInUser();
      // Redireccionar al usuario o mostrar mensaje de cierre de sesión
    }, duration);
  }

  checkAutoLogout() {
    const expirationDate = localStorage.getItem('expiration');
    if (!expirationDate) return;

    const expiresIn = +expirationDate - new Date().getTime();
    if (expiresIn <= 0) {
      this.clearLoggedInUser();
      // Redireccionar al usuario o mostrar mensaje de cierre de sesión
    } else {
      this.setLogoutTimer(expiresIn);
    }
  }

  logout() {
    this.clearLoggedInUser();
  }
}
