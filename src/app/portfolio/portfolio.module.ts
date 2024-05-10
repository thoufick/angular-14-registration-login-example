import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditStockComponent } from './add-edit-stock.component';
import { ListStockComponent } from './list-stock.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AddEditStockComponent,
    ListStockComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PortfolioModule { }
