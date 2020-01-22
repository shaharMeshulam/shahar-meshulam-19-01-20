import { Directive, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Theme } from './theme.model';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements OnInit, OnDestroy {

  private subscription: Subscription;
  constructor(
    private elementRef: ElementRef,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store.select(fromApp.getTheme).subscribe((theme) => {
      if (theme) {
        this.updateTheme(theme);
      }
    });
  }

  updateTheme(theme: Theme) {
    for (const key in theme.properties) {
      if (theme.properties.hasOwnProperty(key)) {
        this.elementRef.nativeElement.style.setProperty(key, theme.properties[key]);
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
