import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Hotel } from '../models/hotel.interface';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private readonly totalHotels: number = 1000; // 1000 itemed scroll list

  private hotels: Hotel[] = Array.from(
    { length: this.totalHotels },
    (_, i) => ({
      id: i + 1,
      name: `Boutique Hotel ${i + 1}`,
      pricePerNight: 10000 + Math.floor(Math.random() * 10000), // 10,000 - 20,000 Ft : price / person / night
      openingDate: new Date(2025, 2, 1),
      closingDate: new Date(2025, 7, 31),
      imageUrl: `https://picsum.photos/400?random=${i + 1}`,
    })
  );

  constructor() {}

  //  Get Data with Pagination
  getHotelsData(page = 1, itemsPerPage = 50): Observable<Hotel[]> {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, this.totalHotels);
    return of([...this.hotels.slice(startIndex, endIndex)]).pipe(delay(100)); // Simulated network delay
  }

  //  Get Data by Hotel's ID
  getHotelById(id: number): Observable<Hotel | undefined> {
    return of(this.hotels.find((hotel) => hotel.id === id));
  }

  //  Update Data by Hotel's ID
  updateHotel(updatedHotel: Hotel): void {
    this.hotels = this.hotels.map((hotel) =>
      hotel.id === updatedHotel.id ? { ...updatedHotel } : hotel
    );
  }

  //  Delete Data by Hotel's ID
  deleteHotel(id: number): void {
    this.hotels = this.hotels.filter((hotel) => hotel.id !== id);
  }
}
