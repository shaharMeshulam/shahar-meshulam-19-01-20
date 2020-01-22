import { createAction, props } from '@ngrx/store';
import { GeoLocation } from 'src/app/models/geoLocation.model';
import { Weather } from '../weather.model';

export const getLocationByKey = createAction(
  '[Weather] Get Location By Key',
  props<{ key: string }>()
);

export const setLocation = createAction(
  '[Weather] Set Location',
  props<{ location: GeoLocation }>()
);

export const getGeoLocation = createAction(
  '[Weather] Get GeoLocation',
  props<{ location: GeoLocation }>()
);

export const getForecast = createAction(
  '[Weather] Get Forecasts',
  props<{ key: string }>()
);

export const setForecast = createAction(
  '[Weather] Set Forcasts',
  props<{ forecast: Weather}>()
);

