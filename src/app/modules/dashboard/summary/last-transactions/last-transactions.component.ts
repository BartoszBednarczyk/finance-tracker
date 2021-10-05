import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';

@Component({
  selector: 'app-last-transactions',
  templateUrl: './last-transactions.component.html',
  styleUrls: ['./last-transactions.component.scss']
})
export class LastTransactionsComponent implements OnInit {
  transactions: any[] = [];

  constructor(private _transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this._transactionsService.transactions.subscribe(val => {
      if (val.transactions) {
        this.transactions = val;
        console.log(val);
      }
    })
  }

}
