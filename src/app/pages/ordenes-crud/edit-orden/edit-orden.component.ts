import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-edit-orden',
  templateUrl: './edit-orden.component.html',
  styleUrls: ['./edit-orden.component.css']
})
export class EditOrdenComponent implements OnInit {
  idUser: number | null = null;
  pedidos: any[] = [];
  productoId: number | null = null;
  currentPage: number = 1;
  currentExample: number = 2;
  user_rol: string | null = null;
  id_pedido!: number;
  constructor(
    private router: Router,
    private ordenes: PedidosService,
    private productos: ProductosService,
    private route: ActivatedRoute
  ) {
    this.user_rol = localStorage.getItem('userRol');
  }

  ngOnInit(): void {
    this.validarID();
  }

  validarID(){
    if (this.user_rol !== null ) {
      this.id_pedido = this.route.snapshot.params['id'];
      this.obtenerRegistros();
    }else{
      this.router.navigate(['/']);
    }
  }

  obtenerRegistros() {
    const id_usuario = localStorage.getItem('userId');
    if (id_usuario === null) {
      this.router.navigate(['/']);
    } else {
      this.idUser = parseInt(id_usuario, 10);
      this.ordenes.getPedidos().subscribe({
        next: (result) => {
          if (Array.isArray(result)) {
            this.pedidos = result.filter(pedido => pedido.id_usuario === this.idUser && pedido.id_pedido == this.id_pedido)
            console.log('id del pedido', this.id_pedido)
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
}
