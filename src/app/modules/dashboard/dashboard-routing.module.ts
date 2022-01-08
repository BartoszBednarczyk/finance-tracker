import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ExpensesByCategoriesPieComponent } from './graphs/expenses-by-categories-pie/expenses-by-categories-pie.component';
import { ExpensesIncomesBarComponent } from './graphs/expenses-incomes-bar/expenses-incomes-bar.component';
import { HistoryComponent } from './history/history.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'summary',
                pathMatch: 'full',
            },
            {
                path: 'summary',
                component: SummaryComponent,
            },
            {
                path: 'history',
                component: HistoryComponent,
            },
            {
                path: 'charts',
                pathMatch: 'full',
                redirectTo: 'charts/expenses-incomes',
            },
            {
                path: 'charts/expenses-incomes',
                component: ExpensesIncomesBarComponent,
            },
            {
                path: 'charts/by-categories',
                component: ExpensesByCategoriesPieComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
