import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Productos } from 'src/app/models/productos.model';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { map, startWith } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/componentes/confirm-dialog/confirm-dialog.component';
import { Categorias } from 'src/app/models/categorias.model';
import { CategoriaService } from 'src/app/services/categorias/categoria.service';
@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css']
})
export class ListProductoComponent implements OnInit {

  productos: Productos[] = [];
  categorias: Categorias[] = [];
  filteredProductos: Observable<Productos[]>;
  searchControl: FormControl = new FormControl('');
  productIdToDelete: number | null = null;
  id_rol: string | null = null;
  categoriaNombres: { [key: number]: string } = {};
  @ViewChild(ConfirmDialogComponent) customModal!: ConfirmDialogComponent;
  constructor(private productoS: ProductosService, private router: Router, private categoriaService: CategoriaService) {
    this.id_rol = localStorage.getItem('userRol');
    this.filteredProductos = of([]);
    this.categorias = [];
  }

  ngOnInit(): void {
    this.validarId();
  }

  validarId() {
    if (this.id_rol !== null) {
      this.getProducts();
      this.filteredProductos = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterProductos(value))
      );
    } else {
      console.log('id recuperado', this.id_rol)
      this.router.navigate(['/']);
    }

  }


  getProducts(): void {
    this.productoS.getProductos().subscribe(data => {
      this.productos = data;
      console.log('productos arreglo', this.productos)
      this.filteredProductos = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterProductos(value))
      );
      this.getCategorias();
    }, (error) => {
      console.log('error al recuperar la información')
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

  private filterProductos(value: string): Productos[] {
    const filterValue = value.toLowerCase();
    return this.productos.filter(producto =>
      producto.nombre_producto.toLowerCase().includes(filterValue) ||
      this.nombreCategoria(producto.id_categoria).toLowerCase().includes(filterValue) ||
      producto.precio_producto.toString().includes(filterValue)
    );
  }


  nombreCategoria(id: number): string {
    return this.categoriaNombres[id] || 'Desconocida';
  }



  agregarProduct() {
    this.router.navigate(['agregar-productos']);
  }

  showModal(id: number): void {
    this.productIdToDelete = id;
    this.customModal.open();
  }

  /* eliminarProducto(id: number): void {
     if (confirm('¿Estas seguro de eliminar el producto?')) {
       this.productoS.deletProducto(id).subscribe(response => {
         window.location.reload();
       }, error => {
         console.error('Error al eliminar el producto', error);
       }
       )
     }
   }*/

  handleModalClose(confirm: boolean): void {
    if (confirm && this.productIdToDelete !== null) {
      this.productoS.deletProducto(this.productIdToDelete).subscribe(response => {
        this.getProducts(); // Refrescar la lista de productos
      }, error => {
        console.error('Error al eliminar el producto', error);
      });
    }
    this.productIdToDelete = null;
  }

  editarCliente(id: number) {
    this.router.navigate(['editar-productos', id]);
  }
}
