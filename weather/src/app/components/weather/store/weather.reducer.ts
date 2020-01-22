import { Action, createReducer, on } from '@ngrx/store';
import { GeoLocation } from 'src/app/shared/geoLocation.model';

import * as WeatherActions from './weather.actions';
import { Weather } from '../weather.model';

export interface State {
  currentLocation: GeoLocation;
  weather: Weather;
}

const initialState: State = {
  currentLocation: null,
  weather: null,
};

export function WeatherReducer(weatherState: State | undefined, weatherAction: Action) {
  return createReducer(
    initialState,
    on(WeatherActions.setLocation,
      (state, action) => ({
        ...state,
        error: null,
        currentLocation: action.location
      })
    ),
    on(WeatherActions.setForecast,
      (state, action) => ({
        ...state,
        error: null,
        weather: action.forecast
      })
    )
  )(weatherState, weatherAction);
}

// ------------------ Access slices of the state (something like getters)

export const getCurrentLocation = (state: State) => {
  return state.currentLocation;
};

export const getWeather = (state: State) => {
   return state.weather;
};
