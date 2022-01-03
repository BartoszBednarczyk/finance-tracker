import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RemindDialogComponent } from './remind-dialog/remind-dialog.component';

@Component({
    selector: 'app-alert-buttons',
    templateUrl: './alert-buttons.component.html',
    styleUrls: ['./alert-buttons.component.scss'],
})
export class AlertButtonsComponent implements OnInit {
    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {}

    openRemindDialog() {
        this.dialog.open(RemindDialogComponent, {
            width: 'auto',
        });
    }
}
