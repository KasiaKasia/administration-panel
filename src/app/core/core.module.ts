import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';
import { MessageService } from '../message.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    MessageService
  ],
  declarations: [NavbarComponent, FooterComponent, NotFoundComponent],
  exports: [NavbarComponent, FooterComponent]
})
export class CoreModule { }
