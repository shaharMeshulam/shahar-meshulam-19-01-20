import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { SearchModule } from './search/search.module';

import { WeatherComponent } from './weather.component';

@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    SharedModule,
    SearchModule,
    RouterModule.forChild([{ path: '', component: WeatherComponent }])
  ]
})
export class WeatherModule { }
