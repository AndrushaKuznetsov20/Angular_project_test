import { Locality } from './locality.model';
import { Assistance } from './assistance.model';
import { TypeAttraction } from './enum/TypeAttraction.enum';

export class Attraction {
  id?: number;
  name?: string;
  createDate?: Date;
  briefDescription?: string;
  typeAttraction?: TypeAttraction;
  locality?: Locality;
  assistanceList?: Assistance[];

  constructor() {
    this.assistanceList = [];
    this.createDate = new Date();
  }
}