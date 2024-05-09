import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditStockComponent } from './add-edit-stock/add-edit-stock.component';
import { ListStockComponent } from './list-stock/list-stock.component';
import { LayoutComponent } from './layout/layout.component';



@NgModule({
  declarations: [
    AddEditStockComponent,
    ListStockComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PortfolioModule { }
