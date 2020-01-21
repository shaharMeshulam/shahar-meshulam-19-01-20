import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { GeoPositionApiResponse, ForecastApiResponse, CurrentCondition } from 'src/app/models/api.model';
import { GeoLocation } from 'src/app/shared/geoLocation.model';
import { Weather } from '../weather.model';

import { translateForecast } from '../../../helpers/f2c';

import * as WhetherActions from './weather.actions';
import * as fromApp from '../../../store/app.reducer';

@Injectable()
export class WeatherEffects {

  getLocationByKey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WhetherActions.getLocationByKey),
      switchMap(action => {
        return this.http.get<GeoPositionApiResponse>(`http://dataservice.accuweather.com/locations/v1/${ action.key }`);
      }),
      map(resData => {
        const location: GeoLocation = new GeoLocation(
          resData.GeoPosition.Latitude,
          resData.GeoPosition.Longitude,
          resData.LocalizedName, resData.Key.toString()
        );
        return WhetherActions.setLocation({ location });
      })
    )
  );

  getGeoLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WhetherActions.getGeoLocation),
      switchMap(action => {
        let params = new HttpParams();
        params = params.append('q', `${action.location.latitude}, ${action.location.longitude}`);
        return this.http.get<GeoPositionApiResponse>(
          'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search',
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
      })
    )
  );

  getForecasts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WhetherActions.setLocation),
      switchMap(action => forkJoin([
        this.http.get<ForecastApiResponse>(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${action.location.key}`),
        this.http.get<CurrentCondition>(`http://dataservice.accuweather.com/currentconditions/v1/${action.location.key}`)
      ])),
      withLatestFrom(this.store.select('config')),
      map(([resData, configState]) => {
        if (configState.isCelsius) {
          resData[0].DailyForecasts = translateForecast('C', resData[0].DailyForecasts);
        }
        return WhetherActions.setForecast({ forecast: new Weather(resData[1][0], resData[0])});
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {

  }
}
