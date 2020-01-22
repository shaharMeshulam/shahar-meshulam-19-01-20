import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as fromApp from './app.reducer';
import * as ConfigActions from './config.actions';
import * as WeatherActions from '../components/weather/store/weather.actions';

import { withLatestFrom, map, tap } from 'rxjs/operators';

import { translateForecast } from '../helpers/f2c';

@Injectable()
export class ConfigEffects {

  onToggleF2c$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.toggleCelsius),
      withLatestFrom(this.store.select(fromApp.getIsCelsius)),
      map(([action, isCelsius]) => isCelsius),
      withLatestFrom(this.store.select(fromApp.getForecasts)),
      map(([isCelsius, forecasts]) => {
        localStorage.setItem('isCelsius', isCelsius.toString());
        // If there is no forecasts return nothing
        if (!forecasts) { return { type: 'DUMMY' }; }
        if (!isCelsius) {
          // If user chose fahrenheit - translate forecasts to fahrenheit
          forecasts.forecasts.DailyForecasts = translateForecast('F', forecasts.forecasts.DailyForecasts);
        } else {
          // If user chose celsius - translate forecasts to celsius
          forecasts.forecasts.DailyForecasts = translateForecast('C', forecasts.forecasts.DailyForecasts);
        }
        return WeatherActions.setForecast({ forecast: forecasts });
      })
    )
  );

  onThemeChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.changeTheme),
      map(action => action.themeName),
      withLatestFrom(this.store.select(fromApp.getThemes)),
      map(([themeName, themes]) => {
        localStorage.setItem('theme', themeName);
        const theme = themes.find(t => t.name === themeName);
        return ConfigActions.setTheme({ theme });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) { }
}
