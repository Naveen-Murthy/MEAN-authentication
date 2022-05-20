import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loginSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private authService: AuthenticationService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get fromdetails() {
    return this.loginForm.controls;
  }

  login() {
    this.loginSubmitted = true;
    if (this.loginForm.valid) {
      this.loginSubmitted = false;
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        if (res.success) {
          this.toast.success('Successful', 'Login');
          this.utilService.setItemToSessionStorage('token',res.token);
          this.utilService.setItemToLocalStorage('username',res.user.username);
          setTimeout(() => {
            this.authService.loggedIn();
            this.router.navigate(['/dashboard']);
          }, 3000);
        } else if (res.msg == 'Wrong password.') {
          this.toast.error(res.msg, 'Error');
        } else {
          this.toast.error(
            res.msg + ', redirecting to register page.',
            'Error'
          );
          setTimeout(() => {
            this.router.navigate(['/register']);
          }, 3000);
        }
      });
    }
  }
}
