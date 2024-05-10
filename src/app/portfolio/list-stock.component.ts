import { Component, OnInit } from '@angular/core';
import { StockService } from '@app/_services/stock.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.less']
})
export class ListStockComponent implements OnInit {

  stocks?: any[];

    constructor(private stockService: StockService) {}

    ngOnInit() {
        this.stockService.getAll()
            .pipe(first())
            .subscribe(users => this.stocks = this.stocks);
    }

    deleteStock(id: string) {
        const stock = this.stocks!.find(x => x.id === id);
        stock.isDeleting = true;
        this.stockService.delete(id)
            .pipe(first())
            .subscribe(() => this.stocks = this.stocks!.filter(x => x.id !== id));
    }
}
