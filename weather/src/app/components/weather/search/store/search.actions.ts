import { createAction, props } from '@ngrx/store';
import { AutoCompleteItem } from 'src/app/models/api.model';

export const getAutoComplete = createAction(
  '[Weather] Get Auto Complete',
  props<{ q: string }>()
);

export const setAutoComplete = createAction(
  '[Weather] Set Auto Complete',
  props<{ options: AutoCompleteItem[] }>()
);
