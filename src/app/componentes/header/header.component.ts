import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users/user.service';
import { LogoutComponent } from '../logout/logout.component';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(LogoutComponent) customModalogout!: LogoutComponent;
  loggedInUser: User | null = null;
  logeado: boolean= false;
  esAdmin: boolean = false;
  constructor(private userService: UserService, private authService: AuthService) {
    const id_rol = localStorage.getItem('userRol');
    this.logeado = id_rol === '1';
   }

   ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.logeado = loggedIn;
    });

    this.authService.getUserRol().subscribe(rol => {
      this.esAdmin = rol === '1';
    });
  }

  showModal() {
    this.customModalogout.open();
  }

  onLogout(confirm: boolean) {
    if (confirm) {
      this.userService.logout();
      this.loggedInUser = null;
      this.logeado = false;
      window.location.reload();
    }

  }
}
