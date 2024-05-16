import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditStockComponent } from './add-edit-stock.component';
import { ListStockComponent } from './list-stock.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddEditStockComponent,
    ListStockComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PortfolioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class PortfolioModule { }
