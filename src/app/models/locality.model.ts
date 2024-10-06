import { Attraction } from './attraction.model';

export class Locality {
  id?: number;
  settlement?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  attractionList: Attraction[];

  constructor() {
    this.attractionList = [];
  }
}