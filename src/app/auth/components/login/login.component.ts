import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../shared/services/auth.service';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-login',
  imports: [SharedModule, ReactiveFormsModule, RegistrationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  auth = inject(AuthService);
  router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  isProgressVisible: boolean = false;
  errorMessage: string | null = null;

  ngOnInit(): void {}

  loginUser(): void {
    if (this.loginForm.invalid) return;

    this.isProgressVisible = true;

    const rawForm = this.loginForm.getRawValue();
    this.auth.loginUser(rawForm.email ?? '', rawForm.password ?? '').subscribe({
      next: () => {
        this.isProgressVisible = false;
        this.router.navigateByUrl('/admin/hotel-list');
      },
      error: (error) => {
        this.isProgressVisible = false;
        this.errorMessage = error.message;
      },
    });
  }
}
