import { CurrentCondition } from 'src/app/models/api.model';
import { GeoLocation } from 'src/app/shared/geoLocation.model';

export class Favorite {
  constructor(
    public geoLocation: GeoLocation,
    public currentCondition?: CurrentCondition
  ) {}
}
