import { Action, createReducer, on } from '@ngrx/store';

import * as ConfigActions from './config.actions';
import { Theme } from '../theme/symbols';


export interface State {
  isCelsius: boolean;
  error: string;
  theme: Theme;
}

const initialState: State = {
  isCelsius: false,
  error: null,
  theme: null,
};

export function configReducer(configState: State | undefined, configAction: Action) {
  return createReducer(
    initialState,
    on(ConfigActions.toggleCelsius,
      (state, action) => ({
        ...state,
        isCelsius: !state.isCelsius
      })
    ),
    on(ConfigActions.setError,
      (state, action) => ({
        ...state,
        error: action.error
      })
    ),
    on(ConfigActions.setTheme,
      (state, action) => ({
        ...state,
        theme: action.theme
      })
    )
  )(configState, configAction);
}

export const getIsCelsius = (state: State) => {
  return state.isCelsius;
};

export const getError = (state: State) => {
  return state.error;
};

export const getTheme = (state: State) => {
  return state.theme;
};

