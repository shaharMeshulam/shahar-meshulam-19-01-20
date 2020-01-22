import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';

import { environment } from 'src/environments/environment';

import { WeatherEffects } from './components/weather/store/weather.effects';
import { SearchEffects } from './components/weather/search/store/search.effects';
import { FavoritesEffects } from './components/favorites/store/favorites.effects';
import { ConfigEffects } from './store/config.effects';

import { ApiInterceptorService } from './services/api-interceptor.service';

import * as fromApp from './store/app.reducer';
import { ThemeModule } from './theme/theme.module';
import { lightTheme } from './theme/light-theme';
import { darkTheme } from './theme/dark-theme';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlashMessagesModule.forRoot(),
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([WeatherEffects, SearchEffects, FavoritesEffects, ConfigEffects]),
    StoreDevtoolsModule.instrument({logOnly : environment.production}),
    StoreRouterConnectingModule.forRoot(),
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
