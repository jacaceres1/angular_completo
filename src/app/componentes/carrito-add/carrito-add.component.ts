import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito-add',
  templateUrl: './carrito-add.component.html',
  styleUrls: ['./carrito-add.component.css']
})
export class CarritoAddComponent implements OnInit {
  @Output() onOpen = new EventEmitter<boolean>();
  modalAbierto: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  open(){
    this.modalAbierto = true;
    this.onOpen.emit(true);
  }

  close(){
    this.modalAbierto = false;
    this.router.navigate(['/']);
  }
}
