import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as fromApp from './app.reducer';
import * as ConfigActions from './config.actions';
import * as WeatherActions from '../components/weather/store/weather.actions';

import { withLatestFrom, map } from 'rxjs/operators';

import { translateForecast } from '../helpers/f2c';

@Injectable()
export class ConfigEffects {

  onToggleF2c = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.toggleCelsius),
      withLatestFrom(this.store.select('config')),
      map(([action, configState]) => {
        return configState.isCelsius;
      }),
      withLatestFrom(this.store.select('weather')),
      map(([isCelsius, latestStoreData]) => {
        // If there is no forecasts return nothing
        if (!latestStoreData.weather) { return { type: 'DUMMY' }; }
        if (!isCelsius) {
          // If user chose fahrenheit - translate forecasts to fahrenheit
          latestStoreData.weather.forecasts.DailyForecasts = translateForecast('F', latestStoreData.weather.forecasts.DailyForecasts);
        } else {
          // If user chose celsius - translate forecasts to celsius
          latestStoreData.weather.forecasts.DailyForecasts = translateForecast('C', latestStoreData.weather.forecasts.DailyForecasts);
        }
        return WeatherActions.setForecast({ forecast: latestStoreData.weather });
      })
    )
  );

 constructor(
   private actions$: Actions,
   private store: Store<fromApp.AppState>
 ) { }
}
