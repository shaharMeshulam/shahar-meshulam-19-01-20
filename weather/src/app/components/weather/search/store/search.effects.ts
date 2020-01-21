import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as SearchActions from './search.actions';
import { switchMap, map } from 'rxjs/operators';
import { AutoCompleteItem } from 'src/app/models/api.model';


@Injectable()
export class SearchEffects {
  $getAutoComplete = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.getAutoComplete),
      switchMap(action => {
        let params = new HttpParams();
        params = params.append('q', action.q);
        return this.http.get<AutoCompleteItem[]>('http://dataservice.accuweather.com/locations/v1/cities/autocomplete', { params });
      }),
      map(resData => {
        return SearchActions.setAutoComplete({ options: resData });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}

}
