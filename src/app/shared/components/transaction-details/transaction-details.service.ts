import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { TransactionDetailsComponent } from './transaction-details.component';
@Injectable()
export class TransactionDetailsService {
    constructor(private dialog: MatDialog) {}
    dialogRef?: MatDialogRef<TransactionDetailsComponent>;

    public open(options: any) {
        console.log(options);
        this.dialogRef = this.dialog.open(TransactionDetailsComponent, {
            data: {
                id: options.transaction.id,
                title: options.transaction.value.title,
                type: options.transaction.value.type,
                category: options.transaction.value.category,
                amount: options.transaction.value.amount,
                date: options.transaction.value.date,
                description: options.transaction.value.description,
                categories: options.categories,
            },
        });
    }
    public confirmed(): Observable<any> {
        return this.dialogRef!.afterClosed().pipe(
            take(1),
            map((res) => {
                return res;
            })
        );
    }
}
