
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Product } from './user-products/module-product';
import { User } from '../model';
import { Settings } from '../../environments/settings';


@Injectable()
export class ProductsService {

  public userid: string;
  public jwtToken: string;

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

  add_product(userid, product) {
    return this.http.post(Settings.USER_PRODUCT + `${userid}`, JSON.stringify(product), this.options())
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  add_product_user(user_id, product: Product) {
    return this.http.post(Settings.USER_PRODUCT + `${user_id}`, JSON.stringify(product), this.options())
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getProducts() {
    return this.http.get(Settings.API_USER_PRODUCTS + this.userid, this.options())
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getUsersProducts() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(Settings.API_USERS_PRODUCTS, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  deleteProduct(productId: String) {
    return this.http.delete(Settings.USER_PRODUCT + `${productId}`, this.options())
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  updateProduct(product: Product, userid) {
    return this.http.put(Settings.USER_PRODUCT + `${userid}`, JSON.stringify(product), this.options())
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return observableThrowError(error.json().error || 'Server error');
  }
}
