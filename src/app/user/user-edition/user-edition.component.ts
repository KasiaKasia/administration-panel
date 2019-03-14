import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User, UserType, Address } from '../../model';


@Component({
  selector: 'app-user-edition',
  templateUrl: './user-edition.component.html',
  styleUrls: ['./user-edition.component.css']
})

export class UserEditionComponent implements OnInit {

  user: User;
  UserType = UserType;
  userObj: any;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService) { }

  userName = this.makeFormControl();
  email = this.makeFormControl();
  type = this.makeFormControl();
  description = this.makeFormControl();
  street = this.makeFormControl();
  houseNumber = this.makeFormControl();
  city = this.makeFormControl();

  ngOnInit() {
    this.userObj = this.authService.currentUser;
    this.profileForm = this.fb.group({
      userName: this.userName,
      email: this.email,
      type: this.type,
      description: this.description,
      street: this.street,
      houseNumber: this.houseNumber,
      city: this.city
    });

    this.userService.getUser()
      .subscribe(data => {
        if (data.success === false) {
          if (data.errcode) {
            this.authService.logout();
            this.router.navigate(['login']);
          }
        } else {
          this.user = data.data[0];
          this.populateForm(this.user);
        }
      });
  }

  makeFormControl() {
    const cloned = new FormControl('', [Validators.required]);
    return cloned;
  }

  populateForm(data): void {

    this.profileForm.patchValue({
      userName: data.username,
      email: data.email,
      type: data.type,
      description: data.description,
      street: data.address.street,
      houseNumber: data.address.houseNumber,
      city: data.address.city
    });
  }

  edition(formdata: any): void {
    console.log(this.profileForm.value.description);
    if (this.profileForm.dirty && this.profileForm.valid) {
      this.userService.updateUser(this.profileForm.value)
        .subscribe(data => {
          if (!data.success && data.errcode) {
            this.authService.logout();
            this.router.navigate(['/login']);
          } else {
          }
        });
    }
  }
}
