import { Action, createReducer, on } from '@ngrx/store';
import { Favorite } from '../favorite.model';

import * as FavoritesActions from './favorites.actions';

export interface State {
  favorites: Favorite[];
}

const initialState: State = {
  favorites: []
};

export function favoritesReducer(favoritesState: State | undefined, favoritesAction: Action) {
  return createReducer(
    initialState,
    on(FavoritesActions.setFavorites,
      (state, action) => ({
        ...state,
        favorites: action.favorites
      })
    ),
    on(FavoritesActions.removeFavorite,
      (state, action) => ({
        ...state,
        favorites: state.favorites.filter(favorite => {
          return favorite.geoLocation.key !== action.key;
        })
      })
    )
  )(favoritesState, favoritesAction);
}
