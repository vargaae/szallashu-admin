import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { AuthService } from './shared/services/auth.service';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { NavLink } from './shared/models/nav-link.interface';

@Component({
  selector: 'app-root',
  imports: [SharedModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSidenavContainer) sidenavContainer:
    | MatSidenavContainer
    | undefined;
  http = inject(HttpClient);
  auth = inject(AuthService);

  title: string = 'szallashu-admin';

  userLoggedIn: boolean = false;

  protected readonly navLinks: NavLink[] = [
    { title: 'Kezdőlap', linkRoute: '', isGuardedRoute: true },
    {
      title: 'Hotel végoldal - Első Hotel',
      linkRoute: '/admin/hotel-detail/1',
      isGuardedRoute: true,
    },
    { title: 'Dashboard', linkRoute: '/dashboard', isGuardedRoute: false },
  ];

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 810px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
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
  ngAfterViewInit() {
    this.sidenavContainer?.scrollable
      .elementScrolled()
      .subscribe(() => {} /* react to scrolling */);
  }
  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
