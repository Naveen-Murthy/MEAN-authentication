import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loginSubmitted: boolean = false;
  passwordHide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private authService: AuthenticationService,
    private router: Router,
    private utilService: UtilService,
    private encryptService: EncryptionService,
    private _cookieService: CookieService
  ) {
    authService.clearData();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      password: ['', Validators.required],
      rememberme: [false],
    });

    let value = this._cookieService.get('remember');
    if (value == 'true') {
      this.loginForm.setValue({
        email: this.encryptService.decryptData(
          this._cookieService.get('email')
        ),
        password: this.encryptService.decryptData(
          this._cookieService.get('password')
        ),
        rememberme: this._cookieService.get('remember'),
      });
    }
  }

  get fromdetails() {
    return this.loginForm.controls;
  }

  tooglePassword() {
    this.passwordHide = !this.passwordHide;
  }

  login() {
    this.loginSubmitted = true;
    if (this.loginForm.valid) {
      this.loginSubmitted = false;
      this.utilService.showLoader();
      var body = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      var encrytedData = this.encryptService.encryptData(
        JSON.stringify(body.email)
      );
      var payload = {
        encryptedData: encrytedData,
      };
      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        this.utilService.hideLoader();
        if (this.loginForm.value.rememberme) {
          this._cookieService.set(
            'email',
            this.encryptService.encryptData(this.loginForm.value.email)
          );
          this._cookieService.set(
            'password',
            this.encryptService.encryptData(this.loginForm.value.password)
          );
          this._cookieService.set('remember', this.loginForm.value.rememberme);
        } else {
          this._cookieService.delete('email');
          this._cookieService.delete('password');
          this._cookieService.delete('remember');
        }
        if (res.status) {
          this.toast.success('Successful', 'Login');
          this.utilService.setItemToSessionStorage('token', res.token);
          this.utilService.setItemToLocalStorage('username', res.user.username);
          this.authService.loggedIn();
          this.router.navigate(['/dashboard']);
        } else if (res.msg == 'Wrong password.') {
          this.toast.error(res.msg, 'Error');
        } else {
          this.toast.error(
            res.msg + ', redirecting to register page.',
            'Error'
          );
          // setTimeout(() => {
          //   this.registerScreen();
          // }, 3000);
        }
      });
    }
  }

  registerScreen() {
    this.router.navigate(['/register']);
  }
}
