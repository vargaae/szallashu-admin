export interface Hotel {
  id: number;
  name: string;
  pricePerNight: number;
  openingDate: Date;
  closingDate: Date;
  imageUrl: string;
  description?: string; // Szálloda leírása (opcionális)
}
