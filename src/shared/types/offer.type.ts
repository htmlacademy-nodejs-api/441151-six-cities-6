import { OfferType } from './offer-type.enum.js';
import { FacilitiesType } from './facilities-type.enum.js';
import { User } from './user.type.js';
import { Coordinates } from './coordinates.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  imagePreview: string;
  images: string[];
  premium: boolean;
  favorites: boolean;
  rating: number;
  type: OfferType;
  numberOfRooms: number;
  numberOfGuests: number;
  price: number;
  facilities: FacilitiesType[];
  author: User;
  numberOfComments: number;
  coordinates: Coordinates;
}
