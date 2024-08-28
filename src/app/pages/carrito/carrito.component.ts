import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmCarritoComponent } from 'src/app/componentes/confirm-carrito/confirm-carrito.component';
import { ConfirmDialogComponent } from 'src/app/componentes/confirm-dialog/confirm-dialog.component';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  idUser: number | null = null;
  pedidos: any[] = [];
  orderIdToDelete: number | null = null;
  productoId: number | null = null;
  currentPage: number = 1;
  currentExample: number = 2;
  @ViewChild(ConfirmCarritoComponent) customModal!: ConfirmCarritoComponent;
  constructor(
    private router: Router,
    private ordenes: PedidosService,
    private productos: ProductosService
  ) { }

  ngOnInit(): void {
    this.obtenerRegistros();
  }
/*
  obtenerRegistros() {
    const id_usuario = localStorage.getItem('userId');
    if (id_usuario === null) {
      this.router.navigate(['/']);
    } else {
      this.idUser = parseInt(id_usuario, 10);
      this.ordenes.getPedidos().subscribe(result => {
        this.pedidos = result.filter(pedidos => pedidos.id_usuario == this.idUser);
        console.log('productos recuperados', this.pedidos);
      });
    }
  }*/

    obtenerRegistros() {
      const id_usuario = localStorage.getItem('userId');
      if (id_usuario === null) {
        this.router.navigate(['/']);
      } else {
        this.idUser = parseInt(id_usuario, 10);
        this.ordenes.getPedidos().subscribe({
          next: (result) => {
            if (Array.isArray(result)) {
              this.pedidos = result.filter(pedido => pedido.id_usuario === this.idUser && pedido.estado === 'en_proceso');
              if (this.pedidos.length > 0) {
                console.log('Productos recuperados:', this.pedidos);
              } else {
                console.log('No se encontraron productos para el usuario:', this.idUser);
              }
            }
          },
          error: (err) => {
            console.error('Error al recuperar los pedidos:', err);
            this.pedidos = [];
          }
        });
      }
    }



  showModal(id: number, id_producto: number): void {
    this.orderIdToDelete = id;
    this.productoId = id_producto;
    this.customModal.open();
  }


  handleModalClose(confirm: boolean): void {
    if (confirm && this.orderIdToDelete !== null) {
      this.ordenes.deleteFromCart(this.orderIdToDelete).subscribe(result => {
        console.log('pedido eliminado exitosamente');
        if (this.productoId !== null) {
          this.productos.updateEstadoProducto(this.productoId, true).subscribe(result => {

          })
        }
        this.obtenerRegistros();
      }, error => {
        console.error('Error al eliminar el producto', error);
      });
    }

    this.router.navigate(['carrito']);
    this.orderIdToDelete = null;
  }

  agregarProductos(){
    this.router.navigate(['/']);
  }

  calcularTotal(): number{
    return this.pedidos.reduce((total, item) => total + item.precio_producto,0);
  }

  get paginatedPedidos() {
    const startIndex = (this.currentPage - 1) * this.currentExample;
    const endIndex = startIndex + this.currentExample;
    return this.pedidos.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.pedidos.length / this.currentExample);
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.pedidos.length / this.currentExample)) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  transaccion(): void{
    const id_pedido = this.pedidos.length > 0 ? this.pedidos[0].id_pedido : null;
    if (id_pedido !== null) {
      console.log('Transacción para el pedido con id:', id_pedido);
      this.router.navigate(['transación/',id_pedido]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
