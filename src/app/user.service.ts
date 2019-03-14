import { Injectable } from '@angular/core';
import { RequestOptions, Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Settings } from './../environments/settings';


@Injectable()
export class UserService {

  public jwtToken: string;
  public userid: string;

  constructor(private http: Http) {

    const theUser: any = JSON.parse(localStorage.getItem('currentUser'));
    if (theUser) {
      this.jwtToken = theUser.token;
      this.userid = theUser.user.userid;
    }
  }

  options() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  getUser() {
    return this.http.get(Settings.API_USER_EDITION + this.userid, this.options())
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getUsers() {
    return this.http.get(Settings.USERS, this.options())
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  updateUser(oUser) {
    return this.http.put(Settings.API_USEREDITION + this.userid, JSON.stringify(oUser), this.options())
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  updatePassword(oUser) {
    return this.http.put(Settings.API_USERPASSWORD + this.userid, JSON.stringify(oUser), this.options())
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
