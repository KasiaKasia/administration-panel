import { User, UserType } from '../../model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Product, ProductType } from './module-product';
import { ProductsService } from '../products.service';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs/';
import { MessageService } from '../../message.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from '../pager.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { FilterPipe } from '../filter.pipe';


@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})


export class UserProductsComponent implements OnInit {


  @Input()
  product: Product;
  user: User;
  UserType = UserType;
  productName: string;
  productType: ProductType;
  ProductType = ProductType;
  productDesc: string;
  produktForm: FormGroup;
  userObj: any;
  expid: string;
  id: any;
  products: any[];
  users = [];
  allItems: any[];
  pager: any = {};

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private usersService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
    private pagerService: PagerService) { }


  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  formatUsername = (value: any) => value.username || '';
  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === 'Brak' ? this.users : this.users.filter(v =>
        v.username.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))


  ngOnInit() {

    this.userObj = this.authService.currentUser;
    const userid = this.userObj.userid;
    this.getProducts();
    this.getUsers();

    this.produktForm = this.fb.group({
      productName: this.productName,
      productType: this.productType,
      productDesc: this.productDesc
    });
  }


  saveProduct(produktForm: any) {
    if (this.produktForm.dirty && this.produktForm.valid) {
      const theForm = this.produktForm.value;
      if (this.expid !== '') {
        theForm.expid = this.expid;
      }

      this.productsService.add_product(this.userObj.userid, theForm)
        .subscribe(data => {
          if (data.success === false) {
            if (data.errcode) {
              this.authService.logout();
              this.router.navigate(['login']);
            }
          } else {
            console.log('Success ' + data.message);
            this.messageService.success(`Udało się dodać product.`);
          }
          this.produktForm.reset();
          this.getProducts();
        }, error => {
          this.messageService.error(`Nie udało się dodać productu.`);
        });
    }
  }


  getProducts() {
    this.productsService.getProducts().subscribe(res => {
      console.log('getProducts res.data');
      console.log(res.data);
      this.products = res.data;
      this.allItems = res.data;
      this.setPage(1);
    });
  }


  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    this.products = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  fieldsChange(values: any) {
    console.log(values.currentTarget.checked);
  }

  updateProduct(product: Product) {
    this.productsService.updateProduct(product, this.userObj.userid)
      .subscribe(data => {
        if (data.success === false) {
          this.messageService.error(`Nie udało się edytować productu. Błąd: ${data.messagee}.`);
        } else {
          this.messageService.success(`Udało się edytować product ${product.productName}.`);
        }
      }, () => {
        this.messageService.error(`Nie udało się edytować productu ${product.productName}.`);
      });
  }


  addProductForUser(user_id, usernameForAddProduct, product: Product) {
    this.productsService.add_product_user(user_id, product)
      .subscribe(data => {
        if (data.success === false) {
          if (data.errcode) {
            this.messageService.error(`Nie udało się dodać productu. Błąd: ${data.errcode}.`);
          }
          this.messageService.error(`Nie udało się edytować productu. Błąd: ${data.messagee}.`);
        } else {
          this.messageService.success(`Udało się dodać product ${product.productName} dla użytkownika ${usernameForAddProduct}.`);
          this.getProducts();
        }
      }, () => {
        this.messageService.error(`Nie udało się dodać product ${product.productName} dla użytkownika ${usernameForAddProduct}.`);
      });
  }

  getUsers() {
    this.user = null;
    this.usersService.getUsers().subscribe(res => {
      console.log('getUsers res.data');
      console.log(res.data);
      this.users = res.data;
    });
  }

  deleteProduct(productIndex, productId): void {

    this.productsService.deleteProduct(productId)
      .subscribe(data => {
        if (data.success === false) {
          if (data.errcode) {
            this.authService.logout();
            this.router.navigate(['login']);
          }
          this.messageService.error(`Nie udało się usunąć productu.  ${data.message}.`);
        } else {
          this.messageService.success(`Udało się usunąć product.`);
          this.getProducts();
        }
      }, () => {
        this.messageService.error(`Nie udało się usunąć productu. `);
      });
  }
}

