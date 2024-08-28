import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmTransaccionComponent } from 'src/app/componentes/confirm-transaccion/confirm-transaccion.component';
import { TransaccionService } from 'src/app/services/transaccion/transaccion.service';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {

  pedidoID: number = 0;
  numeroReferencia: string = '';
  fechaTransferencia: string = '';

  transaccionForm: FormGroup;
  enviarSolicitud = false;
  @ViewChild(ConfirmTransaccionComponent) customModal!: ConfirmTransaccionComponent;
  mensajeModal: string = '';
  constructor(private router: Router, private transaccionService: TransaccionService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.transaccionForm = this.fb.group({
      codigo_transferencia: ['', Validators.required],
      fecha_transferencia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.validarUserLogin();
  }

  validarUserLogin() {
    const id_usuario = localStorage.getItem('userId');
    if (id_usuario !== null) {
      this.pedidoID = +this.route.snapshot.params['id'];
    } else {
      this.router.navigate(['/']);
    }
  }


  confirmarPago() {
    if (this.transaccionForm.valid && !this.enviarSolicitud) {
      this.enviarSolicitud = true;
      const formValue = this.transaccionForm.value;

      const requestData = {
        ...formValue,
        estado: '0',
        id_pedido: this.pedidoID
      };

      this.transaccionService.addTransaccion(requestData).subscribe(
        response => {
          console.log('transaccion agregada');
          this.mensajeModal = 'Su transacción ha sido registrada, se confirmará su transacción.';
          this.showModal();
          this.enviarSolicitud = false;
        },
        error => {
          console.error('error al agregar el producto', error);
          this.enviarSolicitud = false;
        }
      )
    }
  }

  handleModalClose(confirm: boolean): void {
    if (confirm) {
      this.router.navigate(['/']);
    }
  }

  showModal(): void {
    this.customModal.open(this.mensajeModal);
  }

}
