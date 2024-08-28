import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categorias/categoria.service';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.css']
})
export class EditCategoriaComponent implements OnInit {
  categoriaID !: number;
  categoriaForm: FormGroup;
  id_rol: string | null = null;
  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.categoriaForm = this.fb.group({
      categoria_nombre: ['', Validators.required]
    })
    this.id_rol = localStorage.getItem('userRol');
  }

  ngOnInit(): void {
    this.validarID();
  }

  validarID() {
    if (this.id_rol !== null) {
      this.categoriaID = this.route.snapshot.params['id'];
      this.obtenerCategoria(this.categoriaID);
    } else {
      this.router.navigate(['/']);
    }
  }

  volver() {
    this.router.navigate(['list-categoria']);
  }

  obtenerCategoria(id: number) {
    this.categoriaService.getCategoriaID(id).subscribe(result => {
      if (result) {
        this.categoriaForm.patchValue({
          categoria_nombre: result.categoria_nombre
        });
      }
    });
  }

  onSubmit() {
    if (this.categoriaForm.valid) {
      const updatedCategoria = {
        ...this.categoriaForm.value
      };
      this.categoriaService.editCategoria(this.categoriaID, updatedCategoria).subscribe(
        response => {
          this.volver();
        },
        error => {
          console.error('Error al actualizar el producto', error);
        }
      );
    } else {
      console.log('Formulario no valido');
    }
  }
}
