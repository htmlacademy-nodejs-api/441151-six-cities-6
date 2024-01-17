import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, OfferType, Coordinates, User, FacilitiesType } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([ title, description, postDate, city, imagePreview, images, premium, favorites, rating, type, numberOfRooms,numberOfGuests,price,facilities,author,numberOfComments,coordinates]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city,
        imagePreview,
        images: images.split(';'),
        premium: premium === 'yes',
        favorites: favorites === 'yes',
        rating: Number.parseFloat(rating),
        type: OfferType[type as 'apartment' | 'house' | 'room' | 'hotel'],
        numberOfRooms: Number.parseInt(numberOfRooms, 10),
        numberOfGuests: Number.parseInt(numberOfGuests, 10),
        price: Number.parseInt(price, 10),
        facilities: facilities.split(';') as FacilitiesType[],
        // author: new User(author),
        author: author
          .split(';')
          .reduce((acc, cur, i) => {
            const name = (function() {
              switch(i){
                case 0: return 'name';
                case 1: return 'email';
                case 2: return 'password';
                case 3: return 'type';
                default: return 'avatarPath';
              }
            })();

            return ({ ...acc, [name]: cur })}, {} as User),
        numberOfComments: Number.parseInt(numberOfComments, 10),
        // coordinates: new Coordinates(coordinates),
        coordinates: coordinates
          .split(';')
          .reduce((acc, cur, i) => {
            const name = (function() {
              switch(i){
                case 0: return 'latitude';
                default: return 'longitude';
              }
            })();

            return ({ ...acc, [name]: cur })}, {} as Coordinates)
      }));
  }
}
