import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListStockComponent } from './list-stock.component';
import { AddEditStockComponent } from './add-edit-stock.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ListStockComponent },
            { path: 'add', component: AddEditStockComponent },
            { path: 'edit/:id', component: AddEditStockComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortfolioRoutingModule { }