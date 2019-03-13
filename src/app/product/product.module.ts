
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { NavbarComponent } from '../core/navbar/navbar.component';
import { AuthGuard } from '../auth.guard';
import { HttpModule } from '@angular/http';
import { UserProductsComponent } from '../product/user-products/user-products.component';
import { UsersProductsComponent } from './users-products/users-products.component';
import { ProductsService } from './products.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from './pager.service';
import { FilterPipe } from './filter.pipe';


const routes = [

  {
    path: 'user/products',
    canActivate: [AuthGuard],
    component: UserProductsComponent
  },
  {
    path: 'users/products',
    component: UsersProductsComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],

  declarations: [
    UserProductsComponent,
    UsersProductsComponent,
    FilterPipe
  ],

  providers: [ProductsService, PagerService],

  exports: [
    UserProductsComponent,
    UsersProductsComponent,
    FormsModule,
    ReactiveFormsModule]
})
export class ProductModule { }
