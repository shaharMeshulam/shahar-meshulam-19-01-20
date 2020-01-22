import { Directive, OnInit, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from './symbols';

import * as fromApp from '../store/app.reducer';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements OnInit {

  private unsubscribe = new Subject();
  constructor(
    private elementRef: ElementRef,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.select(fromApp.getTheme).pipe(takeUntil(this.unsubscribe)).subscribe((theme) => {
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

}
