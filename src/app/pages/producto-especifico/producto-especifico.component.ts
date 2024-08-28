import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoAddComponent } from 'src/app/componentes/carrito-add/carrito-add.component';
import { Productos } from 'src/app/models/productos.model';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-producto-especifico',
  templateUrl: './producto-especifico.component.html',
  styleUrls: ['./producto-especifico.component.css']
})
export class ProductoEspecificoComponent implements OnInit {
  @ViewChild(CarritoAddComponent) custoModalAddCart!: CarritoAddComponent;
  producto: Productos | undefined;
  idUser: number | null = null;
  mostrarConDescuento = false;
  constructor(
    private route: ActivatedRoute,
    private rout: Router,
    private productoService: ProductosService,
    private orderService: PedidosService
  ) { }

  ngOnInit(): void {
    this.getProductoId();
  }


  /**obtener el producto especifico */
  getProductoId(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productoService.getProductoId(id).subscribe(data => {
      this.producto = data;
      console.log('producto recuerpado', this.producto)
    }, (error: any) => {
      console.error('Error fetching product:', error);
    });
  }

  public nombreCategoria(id: number): string {
    if (id === 1) {
      return 'Enterizos';
    } else if (id === 2) {
      return 'Pantalones';
    } else {
      return 'Camisetas Básicas'
    }
  }



  volver() {
    this.rout.navigate(['/']);
  }





  agregarCarrito(): void {
    const id_producto = +this.route.snapshot.paramMap.get('id')!;
    const id_usuario = localStorage.getItem('userId');
    if (id_usuario === null) {
      this.rout.navigate(['login']);
    } else {
      this.idUser = parseInt(id_usuario, 10);
      this.orderService.addToCart(this.idUser, id_producto).subscribe(result => {

        this.productoService.updateEstadoProducto(id_producto, false).subscribe(result => {
          console.log('producto agregado al carrito')
          this.custoModalAddCart.open();
          console.log('ventana modal abierta', id_producto);
          console.log('id del usuario', this.idUser);
        })
      })
    }
  }
}
