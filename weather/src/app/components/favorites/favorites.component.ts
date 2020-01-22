import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, animate, style, keyframes } from '@angular/animations';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Favorite } from './favorite.model';
import { GeoLocation } from 'src/app/shared/geoLocation.model';

import * as fromApp from '../../store/app.reducer';
import * as FavoritesActions from './store/favorites.actions';
import * as WeatherActions from '../weather/store/weather.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss', '../../shared/list.scss'],
  animations: [
    trigger('list', [
      // In transition
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
      ]),
      // Out transition
      transition('* => void', [
        animate(300, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: Favorite[];
  unit: string;
  error: string;

  private favoritesSubscription: Subscription;
  private celsiusSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {
    // Get all favorites currentConditions
    this.store.dispatch(FavoritesActions.getFavoritesForecasts());

    // Subscribe to favorites state changes
    this.favoritesSubscription = this.store.select('favorites').subscribe(favoritesState => {
      this.favorites = favoritesState.favorites;
    });

    // Subscribe to config state changes
    this.celsiusSubscription = this.store.select(fromApp.getIsCelsius).subscribe(isCelsius => {
      this.unit = isCelsius ? 'Metric' : 'Imperial';
    });

    // Subscribe to any error
    this.errorSubscription = this.store.select(fromApp.getError).subscribe(error => this.error = error);
  }

  onRemove(key: string) {
    this.store.dispatch(FavoritesActions.removeFavorite({ key }));
  }

  trackByFn(index: number) {
    return index;
  }

  onFavoriteSelected(selectedGeoLocation: GeoLocation) {
    this.store.dispatch(WeatherActions.setLocation({ location: selectedGeoLocation }));
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
    this.celsiusSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }
}
