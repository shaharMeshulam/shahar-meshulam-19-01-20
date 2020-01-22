import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as ConfigActions from '../../store/config.actions';

import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  selectedTheme: string;
  isCelsius: boolean;

  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select(fromApp.getTheme).subscribe(theme => this.selectedTheme = theme.name);

    this.store.select(fromApp.getIsCelsius).pipe(
      take(1)
    ).subscribe(isCelsius => this.isCelsius = isCelsius);
  }

  onToggleTheme() {
    if (this.selectedTheme === 'light') {
      this.store.dispatch(ConfigActions.changeTheme({ themeName: 'dark' }));
    } else {
      this.store.dispatch(ConfigActions.changeTheme({ themeName: 'light' }));
    }
  }

  onToggleF2C() {
    this.store.dispatch(ConfigActions.toggleCelsius());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
