import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { Hotel } from '../../models/hotel.interface';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-admin-list',
  imports: [
    SharedModule,
    CommonModule,
    AsyncPipe,
    InfiniteScrollDirective,
    NgOptimizedImage,
  ],

  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss',
})
export class AdminListComponent implements OnInit {
  hotelService = inject(HotelService);
  obsArray: BehaviorSubject<Hotel[]> = new BehaviorSubject<Hotel[]>([]);
  hotels$: Observable<Hotel[]> = this.obsArray.asObservable();

  isLoading = false;
  currentPage = 1;
  itemsPerPage = 50;

  toggleLoading = () => (this.isLoading = !this.isLoading);

  loadData = () => {
    this.toggleLoading();
    this.hotelService
      .getHotelsData(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          if (response) {
            this.obsArray.next(response);
          }
        },
        error: (err) => console.log(err),
        complete: () => this.toggleLoading(),
      });
  };

  ngOnInit(): void {
    this.loadData();
  }

  // This method will be called on scrolling the page
  appendData = () => {
    this.toggleLoading();
    this.hotelService
      .getHotelsData(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          const currentItems = this.obsArray.getValue();
          if (response) {
            this.obsArray.next([...currentItems, ...response]);
          }
        },
        error: (err) => console.log(err),
        complete: () => this.toggleLoading(),
      });
  };

  // Infinite Scroll's event emitter
  onScroll(): void {
    this.currentPage++;
    this.appendData();
  }
}
