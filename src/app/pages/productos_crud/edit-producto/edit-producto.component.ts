import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/models/categorias.model';
import { CategoriaService } from 'src/app/services/categorias/categoria.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent implements OnInit {
  productoId!: number;
  productForm: FormGroup;
  imagenActual: string | ArrayBuffer | null = null;
  categorias: Categorias[] = [];
  categoriaNombres: { [key: number]: string } = {};
  id_rol: string | null = null;
  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productoService: ProductosService) {
    this.productForm = this.fb.group({
      id_categoria: ['', Validators.required],
      nombre_producto: ['', Validators.required],
      precio_producto: ['', Validators.required],
      cantidad_producto: ['', Validators.required],
      descripcion_producto: ['', Validators.required],
      descuento_producto: ['', Validators.required],
    })
    this.id_rol = localStorage.getItem('userRol');
  }

  ngOnInit(): void {
    this.validarID();
  }

  validarID(){
    if (this.id_rol !== null) {
      this.productoId = this.route.snapshot.params['id'];
      this.getCategorias();
      this.obtenerProducto(this.productoId);
    } else {
      this.router.navigate(['/']);
    }
  }
  volver() {
    this.router.navigate(['list-produtos']);
  }

  onSubmit() {
    if (this.productForm.valid) {
      const updatedProducto = {
        ...this.productForm.value,
      };
      delete updatedProducto.imagen;
      console.log('Datos enviados para actualizar:', updatedProducto);

      this.productoService.updateProducto(this.productoId, updatedProducto).subscribe(
        response => {
          console.log('Producto actualizado exitosamente:', response);
          this.volver();  // Navega de vuelta a la lista de productos
        },
        error => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  obtenerProducto(id: number) {
    this.productoService.getProductoId(id).subscribe(result => {
      if (result) {
        this.productForm.patchValue({
          id_categoria: result.id_categoria,
          nombre_producto: result.nombre_producto,
          precio_producto: result.precio_producto,
          cantidad_producto: result.cantidad_producto,
          descripcion_producto: result.descripcion_producto,
          descuento_producto: result.descuento_producto
        });
      }
    });
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
