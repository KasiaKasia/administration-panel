import { User, UserType } from '../../model';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  userName: string;
  password: string;
  email: string;
  type: UserType;
  UserType = UserType;
  registrationForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: this.makeFormControl(),
      password: this.makeFormControl(),
      email: this.makeFormControl(),
      type: this.makeFormControl(),
    });
  }

  makeFormControl() {
    const cloned = new FormControl('', [Validators.required]);
    return cloned;
  }

  registration() {
    if (this.registrationForm.dirty && this.registrationForm.valid) {
      this.authService.registration(this.registrationForm.value)
        .subscribe(data => {
          if (data.success === false) {       
          } else {        
            this.router.navigate(['']);
          }
          this.registrationForm.reset();
        });
    }
  }
}
