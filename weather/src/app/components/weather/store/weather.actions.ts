import { createAction, props } from '@ngrx/store';
import { GeoLocation } from 'src/app/shared/geoLocation.model';
import { ForecastApiResponse, AutoCompleteItem, CurrentCondition } from 'src/app/models/api.model';
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

export const setCurrentCondition = createAction(
  '[Weather] Set Current Condition',
  props<{ currentCondition: CurrentCondition }>()
);

export const setError = createAction(
  '[Weather] Set Error',
  props<{ error: string }>()
);
