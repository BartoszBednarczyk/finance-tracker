import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-remind-dialog',
    templateUrl: './remind-dialog.component.html',
    styleUrls: ['./remind-dialog.component.scss'],
})
export class RemindDialogComponent implements OnInit {
    form: FormGroup = new FormGroup({
        title: new FormControl(''),
        date: new FormControl(''),
    });
    constructor(private _alertsService: AlertsService, @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
        if (this.data) {
            console.log(this.data);
            let titleIndex = this.data.entities.findIndex((entity: any) => entity.type == 'reminder_name');
            let dateIndex = this.data.entities.findIndex((entity: any) => entity.type == 'date');
            this.form.setValue({ title: this.data.entities[titleIndex].value, date: this.data.entities[dateIndex].value });
        }
    }

    addReminder(): void {
        this._alertsService.createAlert(this.form.value);
    }
}
