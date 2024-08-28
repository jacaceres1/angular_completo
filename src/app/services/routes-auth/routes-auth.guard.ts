import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoutesAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // Verificar si el usuario tiene un idRol en localStorage
    const idRol = localStorage.getItem('idRol');

    // Definir las rutas que requieren permiso de administrador
    const adminRoutes = ['list-categoria', 'add-categoria', 'edit-categoria'];

    // Obtener la ruta actual
    const currentRoute = state.url.replace('/', '');

    // Si no hay idRol en localStorage, redirigir al login
    if (!idRol) {
      this.router.navigate(['/login']);
      return false;
    }

    // Verificar permisos de administrador
    if (idRol !== 'admin' && adminRoutes.includes(currentRoute)) {
      // Redirigir a home u otra página no permitida
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
