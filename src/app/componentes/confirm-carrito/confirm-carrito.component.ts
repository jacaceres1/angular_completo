import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-carrito',
  templateUrl: './confirm-carrito.component.html',
  styleUrls: ['./confirm-carrito.component.css']
})
export class ConfirmCarritoComponent implements OnInit {
  showModal: boolean = false;
  @Output() onClose = new EventEmitter<boolean>();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  open(){
    this.showModal = true;
  }

  close(){
    this.showModal = false;
    this.onClose.emit(false);
  }

  confirm(){
    this.showModal = false;
    this.onClose.emit(true);
  }
}
