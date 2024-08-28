import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userRolSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);



  constructor() {
    const idRol = localStorage.getItem('userRol');
    if (idRol !== null) {
      this.userRolSubject.next(idRol);
      this.loggedInSubject.next(true);
    }else{
      this.userRolSubject.next(null);
      this.loggedInSubject.next(false);
    }
   }

   isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  getUserRol(): Observable<string | null> {
    return this.userRolSubject.asObservable();
  }

  login(): void {
    // Lógica de inicio de sesión
    const idRol = localStorage.getItem('userRol');
    if (idRol !== null) {
      this.userRolSubject.next(idRol);
      this.loggedInSubject.next(true);
    }
  }

  logout(): void {
    // Lógica de cierre de sesión
    localStorage.removeItem('userRol');
    this.userRolSubject.next(null);
    this.loggedInSubject.next(false);
  }
}
