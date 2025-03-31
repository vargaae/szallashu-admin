import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  auth = inject(AuthService);
  router = inject(Router);

  isProgressVisible: boolean = false;

  signupForm = this.fb.nonNullable.group({
    email: new FormControl('yourname@example.com', [
      Validators.required,
      Validators.email,
    ]),
    username: new FormControl('username', Validators.required),
    password: new FormControl('', Validators.required),
  });

  userLoggedIn: boolean = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    if (this.userLoggedIn) {
      this.router.navigate(['/admin/hotel-list']);
    }
  }

  signup(): void {
    if (this.signupForm.invalid) return;

    this.isProgressVisible = true;

    const rawForm = this.signupForm.getRawValue();
    this.auth
      .signupUser(
        rawForm.email ?? '',
        rawForm.username ?? '',
        rawForm.password ?? ''
      )
      .subscribe({
        next: () => {
          this.isProgressVisible = false;
          this.router.navigateByUrl('/admin/hotel-list');
        },
        error: (error) => {
          this.isProgressVisible = false;
          this.errorMessage = error.code;
        },
      });
  }
}
