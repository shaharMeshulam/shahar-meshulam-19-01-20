import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { GeoLocation } from 'src/app/shared/geoLocation.model';
import { Weather } from './weather.model';

import * as fromApp from '../../store/app.reducer';
import * as FavoritesActions from '../favorites/store/favorites.actions';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss', '../../shared/list.scss'],
  animations: [
    trigger('list', [
      state('in', style({
        opacity: 1,
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8
          }),
          style({
            transform: 'translateX(0)',
            opacity: 1,
            offset: 1
          })
        ]))
      ])
    ])
  ]
})
export class WeatherComponent implements OnInit, OnDestroy {
  currentLocation: GeoLocation;
  forecast: Weather;
  favorites: string[] = [];
  unit: string;
  error: string;

  private weatherCurrentLocationSubscription: Subscription;
  private weatherForcastSubscription: Subscription;
  private errorSubscription: Subscription;
  private favoritesSubscription: Subscription;
  private configSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // Subscribe to any error
    this.errorSubscription = this.store.select(fromApp.getError).subscribe(error => this.error = error);

    // Subscribe to weather currentLocation state changes
    this.weatherCurrentLocationSubscription = this.store.select(fromApp.getCurrentLocation).subscribe(currentLocation =>
      this.currentLocation = currentLocation
    );

    // Subscribe to weather forecasts state changes
    this.weatherForcastSubscription = this.store.select(fromApp.getForecasts).subscribe(forecast => this.forecast = forecast);

    // Subscribe to favorites state changes
    this.favoritesSubscription = this.store.select('favorites').pipe(
      map(favoritesState => {
        return favoritesState.favorites.map(favorite => {
          return favorite.geoLocation.key;
        });
      })
    ).subscribe(favoritesKeys => {
      this.favorites = favoritesKeys;
    });

    // Subscribe to config state changes
    this.configSubscription = this.store.select(fromApp.getIsCelsius).subscribe(isCelsius => {
      this.unit = isCelsius ? 'Metric' : 'Imperial';
    });
  }

  onAddToFavorites() {
    this.store.dispatch(FavoritesActions.addFavorite({ geoLocation: this.currentLocation }));
  }

  onRemoveFromFavorites() {
    this.store.dispatch(FavoritesActions.removeFavorite({ key: this.currentLocation.key }));
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
    this.weatherCurrentLocationSubscription.unsubscribe();
    this.weatherForcastSubscription.unsubscribe();
    this.favoritesSubscription.unsubscribe();
    this.configSubscription.unsubscribe();
  }
}
