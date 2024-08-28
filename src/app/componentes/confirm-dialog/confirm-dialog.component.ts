import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  showModal: boolean = false;
  @Output() onClose = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }


  open() {
    this.showModal = true;
  }

  close() {
    this.showModal = false;
    this.onClose.emit(false);
  }

  confirm() {
    this.showModal = false;
    this.onClose.emit(true);
  }
}
