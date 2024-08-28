import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  showModalogout: boolean = false;
  @Output() onClose = new EventEmitter<boolean>();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  open(){
    this.showModalogout = true;
  }

  close(){
    this.showModalogout = false;
    this.onClose.emit(false);
  }

  confirm(){
    this.showModalogout = false;
    this.router.navigate(['/']);
    this.onClose.emit(true);
  }
}
