import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/models/categorias.model';
import { CategoriaService } from 'src/app/services/categorias/categoria.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent implements OnInit {
  productForm: FormGroup;
  enviarSolicitud = false;
  selectedFile: File | null = null;

  categorias: Categorias[] = [];
  categoriaNombres: { [key: number]: string } = {};

  id_rol: string | null = null;
  constructor(
    private fb: FormBuilder,
    private productoServcies: ProductosService,
    private router: Router,
    private categoriaService: CategoriaService
  ) {
    this.productForm = this.fb.group({
      id_categoria: ['', Validators.required],
      nombre_producto: ['', Validators.required],
      precio_producto: ['', Validators.required],
      cantidad_producto: ['', Validators.required],
      descripcion_producto: ['', Validators.required],
      imagen_producto: [null, Validators.required],
      descuento_producto: ['', Validators.required],
    });
    this.id_rol = localStorage.getItem('userRol');
  }

  ngOnInit(): void {
    this.validarID();
  }

  validarID(){
    if (this.id_rol !== null) {
      this.getCategorias();
    } else {
      this.router.navigate(['/']);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.productForm.valid && !this.enviarSolicitud) {
      this.enviarSolicitud = true;
      const formData = new FormData();

      const formValue = this.productForm.value;
      for (let key in formValue) {
        formData.append(key, formValue[key]);
      }

      formData.append('estado', '1');
      if (this.selectedFile) {
        formData.append('imagen_producto', this.selectedFile, this.selectedFile.name);

        this.productoServcies.addProducto(formData).subscribe(
          response => {
            console.log('Producto agregado', response);
            this.router.navigate(['list-produtos']);
          },
          error => {
            console.error('Error al agregar el producto', error);
            this.enviarSolicitud = false;
          }
        );
      } else {
        console.error('No se ha seleccionado ningún archivo de imagen');
        this.enviarSolicitud = false;
      }
    }
  }



  getCategorias(): void{
    this.categoriaService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
      categorias.forEach(categoria => {
        this.categoriaNombres[categoria.id_categoria] = categoria.categoria_nombre;
      });
    }, error => {
      console.error('Error fetching categories', error);
    });
  }


  nombreCategoria(id: number): string {
    return this.categoriaNombres[id] || 'Desconocida';
  }
}
