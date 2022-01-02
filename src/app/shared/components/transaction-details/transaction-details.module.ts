import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionDetailsComponent } from './transaction-details.component';
import { TransactionDetailsService } from './transaction-details.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [TransactionDetailsComponent],
    imports: [CommonModule, MatDialogModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatButtonModule, MatSelectModule, MatInputModule],
    exports: [TransactionDetailsComponent],
    providers: [TransactionDetailsService],
})
export class TransactionDetailsModule {}
