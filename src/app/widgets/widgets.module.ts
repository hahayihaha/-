import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [HeaderComponent, PaginationComponent, FooterComponent],
  exports: [
    CommonModule,
    PaginationComponent,
    HeaderComponent,
    FooterComponent
  ],
})
export class WidgetsModule { }
