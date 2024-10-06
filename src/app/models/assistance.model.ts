import { Attraction } from './attraction.model';
import { TypeAssistance } from './enum/TypeAssistance.enum';

export class Assistance {
  id?: number;
  typeAssistance?: TypeAssistance;
  briefDescription?: string;
  performer?: string;
  attractionList: Attraction[];

  constructor() {
    this.attractionList = [];
  }
}