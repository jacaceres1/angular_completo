import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  correo: string = '';
  contrasenia: string = '';

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
  }

  onLogin() {
    this.userService.loginUser(this.correo, this.contrasenia).subscribe(
      response => {
        this.authService.login();
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error al iniciar sesión', error);
      }
    );
  }

}
