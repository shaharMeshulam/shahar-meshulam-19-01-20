import { createAction, props } from '@ngrx/store';
import { GeoLocation } from 'src/app/shared/geoLocation.model';
import { Favorite } from '../favorite.model';

export const getFavoritesFromLocalStorage = createAction(
  '[Favorites] Get Favorites From Local Storage'
);

export const setFavorites = createAction(
  '[Favorites] Set Favorites',
  props<{ favorites: Favorite[] }>()
);

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ geoLocation: GeoLocation }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ key: string }>()
);

export const getFavoritesForecasts = createAction(
  '[Favorites] Get Favorites Forecasts',
);


