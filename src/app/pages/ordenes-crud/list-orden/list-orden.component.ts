import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaccion } from 'src/app/models/transacciones.model';
import { TransaccionService } from 'src/app/services/transaccion/transaccion.service';

@Component({
  selector: 'app-list-orden',
  templateUrl: './list-orden.component.html',
  styleUrls: ['./list-orden.component.css']
})
export class ListOrdenComponent implements OnInit {
  id_user: string | null = null;
  user_rol: string | null = null;
  pedidos: Transaccion[] = [];
  constructor(private router: Router,
    private ordenesServices: TransaccionService,
    private route: ActivatedRoute
  ) {
    this.id_user = localStorage.getItem('userId');
    this.user_rol = localStorage.getItem('userRol');
  }

  ngOnInit(): void {
    this.validarId();
  }

  validarId() {
    if (this.user_rol !== null) {

      this.obtenerRegistros();
    } else {
      this.router.navigate(['/']);
    }
  }

  obtenerRegistros() {
    this.ordenesServices.getTransacciones().subscribe(result => {
      const numberId = Number(this.id_user);
      this.pedidos = result.filter(item => item.id_usuario === numberId)
    })
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  estadoDelPedido(estado: string): string{
    if(estado === 'cancelado'){
      return 'Su Transacción ha sido cancelada ya que la transferencia no se ha realizado';
    }else if(estado === 'verificando'){
      return 'Su Transacción se encuentra en estado de verificación';
    }else{
      return 'Su Transacción ha sido verificada';
    }
  }

  observarTransaccion(id: number){
    this.router.navigate(['orden-detallada/', id]);
  }
}
