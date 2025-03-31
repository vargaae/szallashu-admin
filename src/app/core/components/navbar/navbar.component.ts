import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  auth = inject(AuthService);

  userLoggedIn: boolean = false;

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.auth.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
        this.userLoggedIn = true;
      } else {
        this.auth.currentUserSig.set(null);
        this.userLoggedIn = false;
      }
    });
  }

  logout(): void {
    this.auth.logoutUser();
  }
}
