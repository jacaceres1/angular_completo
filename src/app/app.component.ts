import { Component, OnInit } from '@angular/core';
import { UserService } from './services/users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front_end';

  constructor(private userService: UserService){

  }

  ngOnInit(): void {
  this.userService.checkAutoLogout();
  }
}
