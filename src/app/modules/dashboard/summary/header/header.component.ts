import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/interfaces/User.interface';
import { SettingsComponent } from '../settings/settings.component';
import * as dayjs from 'dayjs';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    user: any;
    alert = 0;
    alerts: any = [];
    categories: any;
    constructor(public dialog: MatDialog, private _userService: UserService, private _alertsService: AlertsService) {
        this._userService.account.subscribe((val) => {
            this.user = val;
            console.log(val);
        });

        this._alertsService.alerts.subscribe((val: any) => {
            this.alert = 0;
            this.alerts = [];
            if (val) {
                for (const [key, value] of Object.entries(val)) {
                    //@ts-expect-error
                    if (dayjs() >= dayjs(value.date.toDate()) && !value.isRead) {
                        this.alert += 1;
                    }
                    console.log(val);

                    this.alerts.push({
                        //@ts-expect-error
                        ...value,
                        id: key,
                    });
                }
            }
            console.log(this.alerts);
        });
    }

    ngOnInit(): void {
        console.log(this._userService.user);
    }

    openDialog() {
        this.dialog.open(SettingsComponent, {
            width: 'auto',
            data: {
                animal: 'panda',
            },
        });
    }

    dismissAlert(ev: any, id: string, newStatus: boolean): void {
        ev.stopPropagation();
        console.log(id);
        this._alertsService.switchAlertStatus(id, newStatus);
    }

    deleteAlert(ev: any, id: string): void {
        ev.stopPropagation();
        this._alertsService.deleteAlert(id);
    }

    showAlert(alert: any) {
        let currentDate = dayjs().format('MM-DD-YYYY');
        let alertDate = dayjs(alert.date.toDate()).format('MM-DD-YYYY');
        if (alertDate > currentDate) {
            return false;
        }
        return true;
    }
}
