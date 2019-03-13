
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { AuthGuard } from '../auth.guard';
import { NavbarComponent } from '../core/navbar/navbar.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserEditionComponent } from './user-edition/user-edition.component';
import { UserProductsComponent } from '../product/user-products/user-products.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


const routes = [
  {
    path: 'user/registration',
    component: UserRegistrationComponent
  }, {
    path: 'user/login',
    component: UserLoginComponent
  }, {
    path: 'user/edition',
    canActivate: [AuthGuard],
    component: UserEditionComponent
  }, {
    path: 'user/password',
    canActivate: [AuthGuard],
    component: UserChangePasswordComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule ,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [
    UserRegistrationComponent,
    UserLoginComponent,
    UserEditionComponent,
    UserChangePasswordComponent,
  ],
  providers: [ UserService ],
  exports: [
    UserRegistrationComponent,
    UserLoginComponent,
    UserEditionComponent,
    UserChangePasswordComponent,
    FormsModule,
    ReactiveFormsModule]
})
export class UserModule { }
