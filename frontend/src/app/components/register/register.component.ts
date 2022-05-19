import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private toast: ToastrService
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
      this.toast.success("Successful", "Registration")
    }
  }
}
