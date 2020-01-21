import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FavoritesComponent } from './favorites.component';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    FavoritesComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: FavoritesComponent }])
  ]
})
export class FavoritesModule { }
