import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { User, UserType } from '../../model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  UserType = UserType;
  userObj: any;
  userid: string;
  constructor(private router: Router, private authService: AuthService) { }

  dateNow: Date; // = Date.now();

  ngOnInit() {

    setInterval(() => {

      this.dateNow = new Date();
    }, 1000);
  }


  logout() {
    this.authService.logout();
    console.log('You have been logged out.');
    this.router.navigate(['user/login']);
  }

}
