import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import { User } from './model';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService {

  public currentUser: User;
  public getNameUser: string;
  public get_idUser: string;
  public jwtToken: string;
  public userid: string;

  constructor(private router: Router, private http: Http ) {

    const theUser: any = JSON.parse(localStorage.getItem('currentUser'));
    if (theUser) {
      this.jwtToken = theUser.token;
    }
  }

  registration(newUser) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/register', JSON.stringify(newUser), options) // , options
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  isLoggedIn_(): boolean {
    try {
      const theUser: any = JSON.parse(localStorage.getItem('currentUser'));
      if (theUser) {
        this.currentUser = theUser.user;
      }
    } catch (e) {
      return false;
    }
    return !!this.currentUser;
  }

  login(user: User) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post('/login', JSON.stringify(user), options ).do((response: Response) => { //
      if (response.json().success) {
        this.currentUser = response.json().message;  
        const userObj: any = {};
        userObj.user = response.json().message;
        userObj.token = response.json().token;
        localStorage.setItem('currentUser', JSON.stringify(userObj));
      }
      response.json();
    });
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  private handleError(error: Response) {
     return Observable.throw(error.json().error || 'Server error');
  }
}
