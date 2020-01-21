import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { SearchComponent } from './search.component';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
