import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminListComponent } from './admin-list.component';
import { HotelService } from '../../services/hotel.service';
import { BehaviorSubject, of } from 'rxjs';
import { Hotel } from '../../models/hotel.interface';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

describe('AdminListComponent', () => {
  let component: AdminListComponent;
  let fixture: ComponentFixture<AdminListComponent>;
  let hotelServiceMock: jasmine.SpyObj<HotelService>;

  const mockHotels: Hotel[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Test Hotel ${i + 1}`,
    pricePerNight: 10000 + Math.floor(Math.random() * 10000),
    openingDate: new Date(),
    closingDate: new Date(),
    imageUrl: `https://picsum.photos/400?random=${i + 1}`,
  }));

  beforeEach(async () => {
    hotelServiceMock = jasmine.createSpyObj('HotelService', ['getHotelsData']);
    hotelServiceMock.getHotelsData.and.returnValue(of(mockHotels));

    await TestBed.configureTestingModule({
      imports: [AdminListComponent, CommonModule, SharedModule, InfiniteScrollDirective], // Az imports-ban kell lennie
      providers: [{ provide: HotelService, useValue: hotelServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial hotels on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(hotelServiceMock.getHotelsData).toHaveBeenCalledWith(1, 50);
    component.hotels$.subscribe((hotels) => {
      expect(hotels.length).toBe(50);
    });
  });

  it('should append new hotels on appendData', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const initialCount = component.obsArray.getValue().length;
    
    component.appendData();
    fixture.detectChanges();

    expect(hotelServiceMock.getHotelsData).toHaveBeenCalledWith(1, 50);
    component.hotels$.subscribe((hotels) => {
      expect(hotels.length).toBe(initialCount + 50);
    });
  });

  it('should increase page number and call appendData on scroll', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const previousPage = component.currentPage;
    component.onScroll();
    fixture.detectChanges();

    expect(component.currentPage).toBe(previousPage + 1);
    expect(hotelServiceMock.getHotelsData).toHaveBeenCalledWith(previousPage + 1, 50);
  });
});
