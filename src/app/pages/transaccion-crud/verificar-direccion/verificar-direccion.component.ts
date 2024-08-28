import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/direcciones.model';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-verificar-direccion',
  templateUrl: './verificar-direccion.component.html',
  styleUrls: ['./verificar-direccion.component.css']
})
export class VerificarDireccionComponent implements OnInit {
  id_pedido!: number;
  user_rol: string | null = null;
  userDir: Usuario | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: PedidosService
  ) {
    this.user_rol = localStorage.getItem('userRol');
  }

  ngOnInit(): void {
    this.validarID();
  }

  validarID() {
    if (this.user_rol !== null) {
      this.id_pedido = this.route.snapshot.params['id'];
      this.obtenerRegistro(this.id_pedido);
    } else {

    }
  }

  obtenerRegistro(id: number) {
    this.orderService.getUsuarioConDirecciones(id).subscribe((data) => {
      this.userDir = data.usuario;
      console.log('direcciones y usuario', this.userDir);
    },
      (error) => {
        console.error('error al obtener los datos', error);
      })
  }

  goBack(){
    this.router.navigate(['list-transacciones']);
  }

}
