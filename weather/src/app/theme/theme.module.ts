import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeDirective } from './theme.directive';


@NgModule({
  imports: [CommonModule],
  declarations: [ThemeDirective],
  exports: [ThemeDirective]
})
export class ThemeModule { }
