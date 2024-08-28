import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaccion } from 'src/app/models/transacciones.model';
import { TransaccionService } from 'src/app/services/transaccion/transaccion.service';

@Component({
  selector: 'app-list-trans',
  templateUrl: './list-trans.component.html',
  styleUrls: ['./list-trans.component.css']
})
export class ListTransComponent implements OnInit {
  id_user: string | null = null;
  user_rol: string | null = null;
  pedidos: Transaccion[] = [];
  constructor(
    private router: Router,
    private ordenesServices: TransaccionService,
    private route: ActivatedRoute
  ) {
    this.id_user = localStorage.getItem('userId');
    this.user_rol = localStorage.getItem('userRol');
   }

  ngOnInit(): void {
    this.validarId();
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
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
      this.pedidos = result;
    })
  }

  estadoDelPedido(estado: string): string{
    if(estado === 'cancelado'){
      return 'Transacción ha sido cancelada';
    }else if(estado === 'verificando'){
      return 'Transacción en verificación';
    }else{
      return 'Transacción verificada, se encuentra en el proceso de distribución';
    }
  }

  observarTransaccion(id1: number){
    this.router.navigate(['verificar-transaccion/', id1]);
  }

  observaDireccion(id: number){
    this.router.navigate(['verifica-direccion/', id]);
  }
}
