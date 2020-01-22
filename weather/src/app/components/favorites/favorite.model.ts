import { CurrentCondition } from 'src/app/models/api.model';
import { GeoLocation } from 'src/app/models/geoLocation.model';

export class Favorite {
  constructor(
    public geoLocation: GeoLocation,
    public currentCondition?: CurrentCondition
  ) {}
}
