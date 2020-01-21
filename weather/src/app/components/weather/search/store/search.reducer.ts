import { AutoCompleteItem } from 'src/app/models/api.model';
import { Action, createReducer, on } from '@ngrx/store';

import * as SearchActions from './search.actions';

export interface State {
  options: AutoCompleteItem[];
}

const initialState: State = {
  options: null
};

export function searchReducer(searchState: State | undefined, searchAction: Action) {
  return createReducer(
    initialState,
    on(SearchActions.setAutoComplete,
      (state, action) => ({
        ...state,
        options: action.options
      })
    )
  )(searchState, searchAction);
}