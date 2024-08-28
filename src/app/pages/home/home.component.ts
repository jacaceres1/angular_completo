import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/models/categorias.model';
import { Productos } from 'src/app/models/productos.model';
import { CategoriaService } from 'src/app/services/categorias/categoria.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  /*arreglo para guardar los datos*/
  productos: Productos[] = [];
  productosFiltrados: Productos[] = [];
  productosEnPagina: Productos[] = [];

  categorias: Categorias[] = [];
  categoriaNombres: { [key: number]: string } = {};
  filtroCategorias: number[] = [];
  filtroPrecio!: number;
  mostrarConDescuento = false;
  cantidadPorPagina = 4;
  paginaActual = 1;
  cantidadPaginas = 0;
  constructor(private productoS: ProductosService, private router: Router, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  /*obtener productos subscribe*/
  getProductos(): void {
    this.productoS.getProductos().subscribe(data => {
      this.productos = data.filter(productos => productos.estado == true);
      console.log(this.productos)
      this.getCategorias();
      const precio = this.productos.map(prod => prod.precio_producto);
      this.filtroPrecio = Math.max(...precio);
      this.aplicarFiltros();
      this.calcularPaginas();
    }, (error) => {
      console.log('error al recuperar la información', error)
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


  onCategoriaChange(id: number, event: any): void {
    if (event.target.checked) {
      this.filtroCategorias.push(id);
    } else {
      this.filtroCategorias = this.filtroCategorias.filter(catId => catId !== id);
    }
    this.aplicarFiltros();
  }

  onPrecioChange(): void {
    this.aplicarFiltros();
    this.calcularPaginas();
  }

  onDescuentoChange(event: any): void {
    this.mostrarConDescuento = event.target.checked;
    this.aplicarFiltros();
    this.calcularPaginas();
  }

  aplicarFiltros(): void {
    this.productosFiltrados = this.productos.filter(producto => {
      const cumpleCategoria = this.filtroCategorias.length ? this.filtroCategorias.includes(producto.id_categoria) : true;
      const cumplePrecio = producto.precio_producto <= this.filtroPrecio;
      const tieneDescuento = producto.descuento_producto && producto.descuento_producto > 0;
      if (this.mostrarConDescuento) {
        return cumpleCategoria && cumplePrecio && tieneDescuento;
      } else {
        return cumpleCategoria && cumplePrecio;
      }
    });

    this.paginaActual = 1;
    this.calcularPaginas();
    this.actualizarProductosEnPagina();
  }

  calcularPaginas(): void {
    this.cantidadPaginas = Math.ceil(this.productosFiltrados.length / this.cantidadPorPagina);
  }

  cambiarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.cantidadPaginas) {
      return;
    }
    this.paginaActual = pagina;
    this.actualizarProductosEnPagina();
  }

  actualizarProductosEnPagina(): void {
    const inicio = (this.paginaActual - 1) * this.cantidadPorPagina;
    const fin = inicio + this.cantidadPorPagina;
    this.productosEnPagina = this.productosFiltrados.slice(inicio, fin);
  }
  agregarCarrito() {
    console.log('item agregado al carrito');
  }

  navigationProduct(id: number){
    this.router.navigate(['/producto', id]);
  }
}
