import { createAction, props } from '@ngrx/store';
import { Theme } from '../theme/theme.model';

export const toggleCelsius = createAction(
  '[Config] Toggle Celsius'
);

export const setError = createAction(
  '[Config] Set Error',
  props<{ error: string }>()
);

export const changeTheme = createAction(
  '[Config] Change Theme',
  props<{ themeName: string }>()
);

export const setTheme = createAction(
  '[Config] Set Theme',
  props<{ theme: Theme }>()
);
