import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CyclicTransactionsService } from 'src/app/core/services/cyclic-transactions/cyclic-transactions.service';

@Component({
    selector: 'app-cyclic-transaction-dialog',
    templateUrl: './cyclic-transaction-dialog.component.html',
    styleUrls: ['./cyclic-transaction-dialog.component.scss'],
})
export class CyclicTransactionDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<CyclicTransactionDialogComponent>, private _cyclicTransactionsService: CyclicTransactionsService) {}

    ngOnInit(): void {}

    closeDialog(data: any): void {
        this._cyclicTransactionsService.addCyclicTransaction(data.form);
        this.dialogRef.close();
    }
}
