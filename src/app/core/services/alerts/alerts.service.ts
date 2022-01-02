import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class AlertsService {
    uid: string = '';
    alerts: Observable<any> = new Observable();
    constructor(private afTransactions: AngularFirestore) {}

    getAlerts(uid: string): void {
        this.uid = uid;
        this.alerts = this.afTransactions.collection<any>(uid).doc('alerts').valueChanges();
    }

    createAlert(alert: any): void {
        let ref = this.afTransactions.collection(this.uid).doc('alerts');
        const id = uuid();
        ref.update({
            [id]: {
                title: alert.title,
                date: new Date(alert.date),
                isRead: false,
            },
        });
    }

    switchAlertStatus(id: string, newStatus: boolean): void {
        this.afTransactions
            .collection<any>(this.uid)
            .doc('alerts')
            .set({ [id]: { isRead: newStatus } }, { merge: true });
    }

    deleteAlert(id: string): void {
        let ref = this.afTransactions.collection(this.uid).doc('alerts');
        let newAlerts: any = {};
        let sub = this.alerts.subscribe((data) => {
            newAlerts = data;
            delete newAlerts[id];
            ref.set(newAlerts);
            sub.unsubscribe();
        });
    }
}
