import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { TransaccionService } from 'src/app/services/transaccion/transaccion.service';

@Component({
  selector: 'app-verifica-trans',
  templateUrl: './verifica-trans.component.html',
  styleUrls: ['./verifica-trans.component.css']
})
export class VerificaTransComponent implements OnInit {
  pedidos: any[] = [];
  productoId: number | null = null;
  currentPage: number = 1;
  currentExample: number = 2;
  user_rol: string | null = null;
  id_pedido!: number;
  id_transa!: number;
  enviarSolicitud = false;
  /**formulario para la validacion */
  verificaForm: FormGroup;
  constructor(
    private router: Router,
    private ordenes: PedidosService,
    private productos: ProductosService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private transaccionService: TransaccionService
  ) {
    this.user_rol = localStorage.getItem('userRol');
    this.verificaForm = this.fb.group({
      estado: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.validarID();
  }

  validarID(){
    if (this.user_rol !== null ) {
      this.id_pedido = this.route.snapshot.params['id1'];
      this.id_transa = this.route.snapshot.params['id2'];
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
      this.ordenes.getPedidos().subscribe({
        next: (result) => {
          if (Array.isArray(result)) {
            this.pedidos = result.filter(pedido => pedido.id_pedido == this.id_pedido)
            console.log('id del pedido', this.id_pedido)
            if (this.pedidos.length > 0) {
              console.log('Productos recuperados:', this.pedidos);
            } else {
              console.log('No se encontraron productos para el usuario:');
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

  confirmarVerifica(){
    if (this.verificaForm.valid && !this.enviarSolicitud) {
      const formValue = this.verificaForm.value;

      const estado = formValue.estado === '1' ? 1 : formValue.estado === '0' ? 0 : formValue.estado;
      console.log('request', estado);
      this.transaccionService.updateEstadoTransaccion(this.id_pedido,estado).subscribe(
        response =>{
          this.enviarSolicitud = false;
          this.router.navigate(['list-transacciones']);
        },
        error => {
          console.error('error al agregar el producto');
          this.enviarSolicitud = false;
        }
      )
    }
  }
}
