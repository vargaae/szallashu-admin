import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  user,
  signOut,
} from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';

import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  authState: any;
  user$ = user(this.firebaseAuth); // it contains the user's data
  currentUserSig = signal<User | null | undefined>(undefined);

  constructor(private route: ActivatedRoute, private router: Router) {}

  signupUser(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: username })
    );
    return from(promise);
  }

  loginUser(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    this.router.navigate(['/login']);
    return from(promise);
  }

  logoutUser(): Promise<void> {
    return this.firebaseAuth
      .signOut()
      .then(() => {
        this.router.navigate(['/admin/hotel-list']);
      })
      .catch((error) => {
        console.log('Auth Service: logout error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return error;
      });
  }
}
