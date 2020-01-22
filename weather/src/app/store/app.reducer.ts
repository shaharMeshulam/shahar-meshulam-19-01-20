import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromWeather from '../components/weather/store/weather.reducer';
import * as fromSearch from '../components/weather/search/store/search.reducer';
import * as fromFavorites from '../components/favorites/store/favorites.reducer';
import * as fromConfig from './config.reducer';

export interface AppState {
  favorites: fromFavorites.State;
  weather: fromWeather.State;
  search: fromSearch.State;
  config: fromConfig.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  favorites: fromFavorites.favoritesReducer,
  weather: fromWeather.WeatherReducer,
  search: fromSearch.searchReducer,
  config: fromConfig.configReducer
};


// Weather selectors
const selectWeatherState = createFeatureSelector('weather');

// Get the state slices as needed
export const getCurrentLocation = createSelector(selectWeatherState, fromWeather.getCurrentLocation);
export const getForecasts = createSelector(selectWeatherState, fromWeather.getWeather);

// Config selectors
const selectConfigState = createFeatureSelector('config');

// Get the state slices as needed
export const getIsCelsius = createSelector(selectConfigState, fromConfig.getIsCelsius);
export const getError = createSelector(selectConfigState, fromConfig.getError);
export const getTheme = createSelector(selectConfigState, fromConfig.getTheme);


