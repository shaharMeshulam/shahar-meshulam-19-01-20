import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { THEMES, Theme } from './symbols';

import * as fromApp from '../store/app.reducer';
import * as ConfigActions from '../store/config.actions';

@Injectable()
export class ThemeService {
  theme: string;

  constructor(
    @Inject(THEMES) public themes: Theme[],
    private store: Store<fromApp.AppState>
  ) {
    const themeName = localStorage.getItem('theme') || 'light';
    this.setTheme(themeName);
  }

  getActiveTheme() {
    const theme = this.themes.find(t => t.name === this.theme);
    if (!theme) {
      throw new Error(`Theme not found: '${this.theme}'`);
    }
    return theme;
  }

  setTheme(name: string) {
    this.theme = name;
    this.store.dispatch(ConfigActions.setTheme({ theme: this.getActiveTheme() }));
  }

}
