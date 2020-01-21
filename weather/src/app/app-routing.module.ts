import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/weather/weather.module').then(m => m.WeatherModule)},
  { path: 'favorites', loadChildren: () => import('./components/favorites/favorites.module').then(m => m.FavoritesModule)},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
