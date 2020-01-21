import { Action, createReducer, on } from '@ngrx/store';

import * as ConfigActions from './config.actions';

export interface State {
  isCelsius: boolean;
}

const initialState: State = {
  isCelsius: false
};

export function configReducer(configState: State | undefined, configAction: Action) {
  return createReducer(
    initialState,
    on(ConfigActions.toggleCelsius,
      (state, action) => ({
        ...state,
        isCelsius: !state.isCelsius
      })
    )
  )(configState, configAction);
}

