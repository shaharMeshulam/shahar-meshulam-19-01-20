import { createAction, props } from '@ngrx/store';

export const toggleCelsius = createAction(
  '[Config] Toggle Celsius'
);

export const setError = createAction(
  '[Config] Set Error',
  props<{ error: string }>()
);
