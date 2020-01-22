import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { GeoLocation } from './shared/geoLocation.model';

import * as fromApp from './store/app.reducer';
import * as WetherActions from './components/weather/store/weather.actions';
import * as FavoritesActions from './components/favorites/store/favorites.actions';
import * as ConfigActions from './store/config.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    if (!navigator.geolocation) {
      this.error();
    } else {
      navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this));
    }

    this.store.dispatch(FavoritesActions.getFavoritesFromLocalStorage());

    const isCelsius = localStorage.getItem('isCelsius');

    if (isCelsius === 'true') {
      this.store.dispatch(ConfigActions.toggleCelsius());
    }
  }

  private success(position) {
    this.store.dispatch(WetherActions.getGeoLocation({ location: new GeoLocation(position.coords.latitude, position.coords.longitude) }));
  }

  private error() {
    this.store.dispatch(WetherActions.setLocation({ location: new GeoLocation(32.085300, 34.781769, 'Tel-Aviv') }));
  }

}
