import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class MessageService {
  title = 'Uwaga';
  constructor(private toastrService: ToastrService) { }

  success(msg: string) {
    this.toastrService.success(msg,  this.title);
  }

  error(msg: string) {
    this.toastrService.error(msg, this.title, {
      disableTimeOut: true,
      closeButton: true,
    });
  }

  remove(numberID: number) {
    this.toastrService.remove(numberID);
  }
}
