import { Action, createReducer, on } from '@ngrx/store';

import { Theme } from '../theme/theme.model';
import { lightTheme } from '../theme/light-theme';
import { darkTheme } from '../theme/dark-theme';

import * as ConfigActions from './config.actions';

export interface State {
  isCelsius: boolean;
  error: string;
  themes: Theme[];
  theme: Theme;
}

const initialState: State = {
  isCelsius: false,
  error: null,
  theme: null,
  themes: [lightTheme, darkTheme]
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

export const getThemes = (state: State) => {
  return state.themes;
};

export const getTheme = (state: State) => {
  return state.theme;
};

