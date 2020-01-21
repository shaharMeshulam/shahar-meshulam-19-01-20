import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import { tap, switchMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { CurrentCondition } from 'src/app/models/api.model';
import { GeoLocation } from 'src/app/shared/geoLocation.model';
import { Favorite } from '../favorite.model';

import * as FavoritesActions from './favorites.actions';

const geoLocations2Favorites = (currentConditions): Favorite[] => {
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
      })
    )
  );

  onItemAdded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.addFavorite),
      map(action => {
        const geoLocations = JSON.parse(localStorage.getItem('favorites')) || [];
        geoLocations.push(action.geoLocation);
        localStorage.setItem('favorites', JSON.stringify(geoLocations));
        const favorites = geoLocations2Favorites(null);
        return FavoritesActions.setFavorites({ favorites });
      })
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
        const requests = geoLocations.map(geoLocation => {
          return this.http.get<CurrentCondition>(`http://dataservice.accuweather.com/currentconditions/v1/${geoLocation.key}`);
        });
        return forkJoin(requests);
      }),
      map(res => {
        const favorites = geoLocations2Favorites(res);
        return FavoritesActions.setFavorites({ favorites });
      })
   )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}
}
