import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/models/categorias.model';
import { CategoriaService } from 'src/app/services/categorias/categoria.service';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit {
  id_rol: string | null = null;

  categoriasForm: FormGroup;
  eviarSolicitud = false;

  constructor(private router: Router, private fb: FormBuilder, private categoriaService: CategoriaService) {
    this.id_rol = localStorage.getItem('userRol');
    this.categoriasForm = this.fb.group({
      categoria_nombre: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.validarID();
  }



  validarID(){
    if (this.id_rol !== null) {
    } else {
      this.router.navigate(['/'])
    }
  }



  onSubmit() {
    if (this.categoriasForm.valid && !this.eviarSolicitud) {
      this.eviarSolicitud = true;

      // Obtén el valor del formulario
      const categoriaData = this.categoriasForm.value;

      console.log('Datos enviados', categoriaData);

      // Llama al servicio para enviar los datos
      this.categoriaService.addCategoria(categoriaData).subscribe(
        response => {
          console.log('Categoría agregada', response);
          this.router.navigate(['list-categoria']);
        },
        error => {
          console.error('Error al agregar categoría', error);
          this.eviarSolicitud = false;
        }
      );
    }
  }
}
