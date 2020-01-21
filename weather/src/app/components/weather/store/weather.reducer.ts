import { Action, createReducer, on } from '@ngrx/store';
import { GeoLocation } from 'src/app/shared/geoLocation.model';

import * as WeatherActions from './weather.actions';
import { Weather } from '../weather.model';

export interface State {
  currentLocation: GeoLocation;
  weather: Weather;
  error: string;
}

const initialState: State = {
  currentLocation: null,
  weather: null,
  error: null
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
    ),
    on(WeatherActions.setCurrentCondition,
      (state, action) => ({
        ...state,
        error: null,
        currentCondition: action.currentCondition
      })
    ),
    on(WeatherActions.setError,
      (state, action) => ({
        ...state,
        currentLocation: null,
        weather: null,
        error: action.error
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

export const getError = (state: State) => {
  return state.error;
};
