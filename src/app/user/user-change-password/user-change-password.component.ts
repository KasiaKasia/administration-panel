import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { MessageService } from '../../message.service';



@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {



  passwordForm: FormGroup;

  // constructor - Dependency Injection
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  oldpassword = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  retypepass = new FormControl('', [Validators.required]);

  ngOnInit() {

    this.passwordForm = this.fb.group({
      oldpassword: this.oldpassword,
      passwordGroup: this.fb.group({
        password: this.password,
        retypepass: this.retypepass,
      })
    });
  }

  updatePassword(formdata: any): void {

    if (this.passwordForm.dirty && this.passwordForm.valid) {

      let theForm = this.passwordForm.value;
      // getting a new password from the form
      const thePass = this.passwordForm.value.passwordGroup.password;
      const theRetypepass = this.passwordForm.value.passwordGroup.retypepass;
      theForm.password = thePass;
      theForm.retypepass = theRetypepass;
      delete theForm.passwordGroup;

      if (thePass === theRetypepass) {


        this.userService.updatePassword(theForm)
          .subscribe(data => {  // subscribe - the method is waiting for the server's response

            if (data.success === false) {
              if (data.errcode) {
                this.authService.logout();
                this.router.navigate(['login']);
                this.messageService.success(`Hasło nie zostało zmienione`);
              }
              this.messageService.success(`Hasło nie zostało zmienione`);
            } else {
              console.log('Change password successful.');
              this.messageService.success(`Hasło zostało zmienione`);
            }
            this.passwordForm.reset();
          });
      } else {
        this.messageService.success(`Nowe hasła nie są takie same`);
      }


    }
  }

}
