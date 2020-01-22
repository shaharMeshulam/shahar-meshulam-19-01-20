import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { tap, switchMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { CurrentCondition } from 'src/app/models/api.model';
import { GeoLocation } from 'src/app/models/geoLocation.model';
import { Favorite } from '../favorite.model';

import * as FavoritesActions from './favorites.actions';
import * as ConfigActions from '../../../store/config.actions';
import * as fromApp from '../../../store/app.reducer';

const geoLocations2Favorites = (currentConditions): Favorite[] => {
  // Get favorites geoLocations from localStorage as return them as favorites array
  const geoLocations: GeoLocation[] = JSON.parse(localStorage.getItem('favorites')) || [];
  return geoLocations.map((geoLocation, i) => {
    const currentCondition = currentConditions ? currentConditions[i][0] : null;
    return new Favorite(geoLocation, currentCondition);
  });
};

@Injectable()
export class FavoritesEffects {

  getFavoritesFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.getFavoritesFromLocalStorage),
      map(() => {
        const favorites = geoLocations2Favorites(null);
        return FavoritesActions.setFavorites({ favorites });
      }),
      // If request success reset error
      tap(() => this.store.dispatch(ConfigActions.setError({ error: null })))
    )
  );

  onItemAdded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.addFavorite),
      map(action => {
        const geoLocations = JSON.parse(localStorage.getItem('favorites')) || [];
        geoLocations.push(action.geoLocation);
        localStorage.setItem('favorites', JSON.stringify(geoLocations));
        // Make favorites from geoLocations (without currentCondition)
        const favorites = geoLocations2Favorites(null);
        return FavoritesActions.setFavorites({ favorites });
      }),
      // If request success reset error
      tap(() => this.store.dispatch(ConfigActions.setError({ error: null })))
    )
  );

  onItemRemoved$ = createEffect(() =>
      this.actions$.pipe(
        ofType(FavoritesActions.removeFavorite),
        tap(action => {
          let geoLocations: GeoLocation[] = JSON.parse(localStorage.getItem('favorites')) || [];
          geoLocations = geoLocations.filter(geoLocation => geoLocation.key !== action.key);
          localStorage.setItem('favorites', JSON.stringify(geoLocations));
        })
      ), { dispatch: false }
  );

  getFavoritesForecasts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.getFavoritesForecasts),
      switchMap(() => {
        const geoLocations: GeoLocation[] = JSON.parse(localStorage.getItem('favorites')) || [];
        // Prepare array of http request from all favorites geoLocations
        const requests = geoLocations.map(geoLocation => {
          return this.http.get<CurrentCondition>(`https://dataservice.accuweather.com/currentconditions/v1/${geoLocation.key}`);
        });
        // ForkJoin requests
        return forkJoin(requests);
      }),
      map(res => {
        // Make favorites with currentCondition (res)
        const favorites = geoLocations2Favorites(res);
        return FavoritesActions.setFavorites({ favorites });
      }),
      // If request success reset error
      tap(() => this.store.dispatch(ConfigActions.setError({ error: null })))
   )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) { }
}
