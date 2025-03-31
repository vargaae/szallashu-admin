import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.interface';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  providers: [provideNativeDateAdapter(), ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  styleUrls: ['./hotel-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel | undefined;
  hotelForm!: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private hotelService = inject(HotelService);
  private route = inject(ActivatedRoute);

  // Set the minimum to This year January 1st and December 31st a year in the future to plan for 2025-2026
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 0, 0, 1);
  readonly maxDate = new Date(this._currentYear + 1, 11, 31);

  ngOnInit() {
    const id = +(this.route.snapshot.paramMap.get('id') ?? '0');
    this.hotelService.getHotelById(id).subscribe((hotel) => {
      this.hotel = hotel;
      this.hotelForm = this.fb.nonNullable.group({
        pricePerNight: [hotel?.pricePerNight ?? 0, Validators.required],
        openingDate: [hotel?.openingDate, Validators.required],
        closingDate: [hotel?.closingDate, Validators.required],
      });
    });
  }

  onSubmit() {
    if (this.hotelForm && this.hotelForm.valid) {
      const updatedHotel = { ...this.hotel, ...this.hotelForm.value };
      this.hotelService.updateHotel(updatedHotel);
      this.router.navigate(['/admin/hotel-list']);
    }
  }

  deleteHotel() {
    this.hotelService.deleteHotel(this.hotel?.id ?? 0);
    this.router.navigate(['/admin/hotel-list']);
  }
}
