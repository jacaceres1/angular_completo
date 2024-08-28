import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-transaccion',
  templateUrl: './confirm-transaccion.component.html',
  styleUrls: ['./confirm-transaccion.component.css']
})
export class ConfirmTransaccionComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() mensaje: string = '';
  @Output() onClose = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  open(mensaje: string): void {
    this.mensaje = mensaje;
    this.showModal = true;
  }

  close(confirm: boolean): void {
    if (confirm) {
      window.open('https://forms.gle/uEUSteCHxn14CJNi8', '_blank');
    }
    this.showModal = false;
    this.onClose.emit(confirm);
  }



}
