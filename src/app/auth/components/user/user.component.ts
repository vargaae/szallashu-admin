import {
  Component,
  EventEmitter,
  inject,
  Input,
  model,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-user',
  imports: [SharedModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  router = inject(Router);
  auth = inject(AuthService);

  count = model<number>(0);

  @Input() roleTitle = '';

  @Output() incrementCountEvent = new EventEmitter<number>();

  @Output() addItemEvent = new EventEmitter<string>();

  onClick() {
    this.incrementCountEvent.emit();
  }

  addItem() {
    this.addItemEvent.emit('🐢');
  }

  logout(): void {
    this.auth.logoutUser();
  }
}
