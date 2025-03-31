import { TestBed } from '@angular/core/testing';

import { HotelService } from './hotel.service';

import { Hotel } from '../models/hotel.interface';

describe('HotelService', () => {
  let service: HotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a specific hotel by ID', (done) => {
    service.getHotelById(10).subscribe((hotel) => {
      expect(hotel).toBeTruthy();
      expect(hotel?.id).toBe(10);
      done();
    });
  });

  it('should update a hotel correctly', () => {
    const updatedHotel: Hotel = {
      id: 5,
      name: 'Updated Hotel Name',
      pricePerNight: 15000,
      openingDate: new Date(2025, 3, 1),
      closingDate: new Date(2025, 8, 30),
      imageUrl: 'https://picsum.photos/400?random=5',
    };

    service.updateHotel(updatedHotel);
    service.getHotelById(5).subscribe((hotel) => {
      expect(hotel).toBeTruthy();
      expect(hotel?.pricePerNight).toBe(15000);
    });
  });

  it('should delete a hotel correctly', () => {
    service.deleteHotel(3);
    service.getHotelById(3).subscribe((hotel) => {
      expect(hotel).toBeUndefined();
    });
  });
});