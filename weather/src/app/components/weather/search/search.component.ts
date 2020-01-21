import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { AutoCompleteItem } from '../../../models/api.model';

import * as fromApp from '../../../store/app.reducer';
import * as SearchActions from './store/search.actions';
import * as WeatherActions from '../../weather/store/weather.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private inputSubscription: Subscription;
  private storeSubscription: Subscription;

  options: AutoCompleteItem[];

  @ViewChild('searchInput', { static: true }) searchInputRef: ElementRef;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // Subscribe to search store - dispatch whenever the options are changed
    this.storeSubscription = this.store.select('search').subscribe(searchState => {
      this.options = searchState.options;
    });

    // Debounce search input
    this.inputSubscription = fromEvent(this.searchInputRef.nativeElement, 'keyup').pipe(
      map((e: Event) => (e.target as HTMLInputElement).value),
      debounceTime(600),
      distinctUntilChanged(),
    ).subscribe(val => {
      this.store.dispatch(SearchActions.getAutoComplete({ q: val }));
    });
  }

  onSelect(e: MatAutocompleteSelectedEvent) {
    this.store.dispatch(WeatherActions.getLocationByKey({ key: e.option.value.Key }));
    this.searchInputRef.nativeElement.value = e.option.value.LocalizedName;
  }

  ngOnDestroy() {
    this.inputSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
  }

}
