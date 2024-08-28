import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  enviarSolicitud = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) {
    this.userForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      nombres_usuario: ['', Validators.required],
      apellidos_usuario: ['', Validators.required],
      addresses: this.fb.array([this.createAddressGroup()])
    }, {
      validator: this.passwordMatchValidator
    });
  }
  ngOnInit(): void {
  }

  createAddressGroup(): FormGroup {
    return this.fb.group({
      calleP: ['', Validators.required],
      calleS: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      celular: ['', Validators.required],
      referencia: ['', Validators.required]
    });
  }

  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  onSubmit(): void {
    if (this.userForm.valid && !this.enviarSolicitud) {
      this.enviarSolicitud = true;
      const formValue = {
        ...this.userForm.getRawValue(),
        usuario: this.userForm.get('correo')?.value.split('@')[0],
        url_foto: 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon-thumbnail.png',
        rol_usuario: 2
      };
      delete formValue.confirmPassword;
      this.userService.addUser(formValue).subscribe(response => {
        console.log('usuario añadido', response);
        this.router.navigate(['/']);
      }, error => {
        console.error('Error al agregar el usuario', error);
        this.enviarSolicitud = false;
      });
    }
  }


  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }


  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('contrasenia')!.value;
    const confirmPassword = formGroup.get('confirmPassword')!.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')!.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')!.setErrors(null);
    }
  }
}
