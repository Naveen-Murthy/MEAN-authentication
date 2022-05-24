import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm: any;
  terms: boolean = false;
  registerSubmitted: boolean = false;

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
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get fromdetails() {
    return this.registrationForm.controls;
  }

  register() {
    this.registerSubmitted = true;
    if (this.terms && this.registrationForm.valid) {
      this.registerSubmitted = false;
      this.utilService.showLoader();
      this.authService.register(this.registrationForm.value).subscribe((res: any) => {
        this.utilService.hideLoader();
        if (res.status) {
          this.toast.success('Successful, please login.', 'Registration');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.toast.error(
            res.msg + ', redirecting to login page.',
            'Error'
          );
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        }
      });
    }
  }
}
