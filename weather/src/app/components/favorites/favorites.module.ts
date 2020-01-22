import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FavoritesComponent } from './favorites.component';

@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: FavoritesComponent }])
  ]
})
export class FavoritesModule { }
