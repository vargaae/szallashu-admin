import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { UserComponent } from '../user/user.component';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [SharedModule, UserComponent],
})
export class DashboardComponent {
  auth = inject(AuthService);
  
  initialCount: number = 1;

  items = new Array();

  addItem(item: string) {
    this.items.push(item);
  }

  onClick(initialCount: number) {
    this.initialCount++;
}
}
