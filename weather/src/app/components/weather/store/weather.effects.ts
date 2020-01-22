import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { switchMap, map, withLatestFrom, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { GeoPositionApiResponse, ForecastApiResponse, CurrentCondition } from 'src/app/models/api.model';
import { GeoLocation } from 'src/app/shared/geoLocation.model';
import { Weather } from '../weather.model';

import { translateForecast } from '../../../helpers/f2c';

import * as WhetherActions from './weather.actions';
import * as fromApp from '../../../store/app.reducer';
import * as ConfigActions from '../../../store/config.actions';

@Injectable()
export class WeatherEffects {

  getLocationByKey$ = createEffect(() =>
    // Get geoPosition by key
    this.actions$.pipe(
      ofType(WhetherActions.getLocationByKey),
      switchMap(action => {
        return this.http.get<GeoPositionApiResponse>(`https://dataservice.accuweather.com/locations/v1/${action.key}`);
      }),
      map(resData => {
        // Create new geoLocation with parameters from GeoPositionApiResponse
        const location: GeoLocation = new GeoLocation(
          resData.GeoPosition.Latitude,
          resData.GeoPosition.Longitude,
          resData.LocalizedName, resData.Key.toString()
        );
        return WhetherActions.setLocation({ location });
      }),
      // If request success reset error
      tap(() => this.store.dispatch(ConfigActions.setError({ error: null })))
    )
  );

  getGeoLocation$ = createEffect(() =>
    // Get geoLocation by latitude & longitude
    this.actions$.pipe(
      ofType(WhetherActions.getGeoLocation),
      switchMap(action => {
        let params = new HttpParams();
        params = params.append('q', `${action.location.latitude}, ${action.location.longitude}`);
        return this.http.get<GeoPositionApiResponse>(
          'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search',
          { params }
        );
      }),
      map(resData => {
        return WhetherActions.setLocation(
          {
            location: new GeoLocation(
              resData.GeoPosition.Latitude,
              resData.GeoPosition.Longitude,
              resData.EnglishName,
              resData.Key.toString()
            )
          }
        );
      }),
      // If request success reset error
      tap(() => this.store.dispatch(ConfigActions.setError({ error: null })))
    )
  );

  getForecasts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WhetherActions.setLocation),
      switchMap(action => forkJoin([
        this.http.get<ForecastApiResponse>(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${action.location.key}`),
        this.http.get<CurrentCondition>(`https://dataservice.accuweather.com/currentconditions/v1/${action.location.key}`)
      ])),
      withLatestFrom(this.store.select(fromApp.getIsCelsius)),
      map(([resData, IsCelsius]) => {
        if (IsCelsius) {
          // Translate to celsius if config isCelsius is true
          resData[0].DailyForecasts = translateForecast('C', resData[0].DailyForecasts);
        }
        return WhetherActions.setForecast({ forecast: new Weather(resData[1][0], resData[0]) });
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
