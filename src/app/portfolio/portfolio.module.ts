import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditStockComponent } from './add-edit-stock.component';
import { ListStockComponent } from './list-stock.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { PortfolioRoutingModule } from './portfolio-routing.module';



@NgModule({
  declarations: [
    AddEditStockComponent,
    ListStockComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PortfolioRoutingModule
  ]

})
export class PortfolioModule { }
