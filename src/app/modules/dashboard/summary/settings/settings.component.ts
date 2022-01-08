import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { CyclicTransactionsService } from 'src/app/core/services/cyclic-transactions/cyclic-transactions.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { v4 as uuid } from 'uuid';
@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    currentTab = 'categories';
    categories: any;
    arrayCategories: any[] = [];
    initBalance = 0;
    password = '';
    oldPassword = '';
    cyclicTransactions: any[] = [];
    constructor(
        private _categoriesService: CategoriesService,
        private _userService: UserService,
        private _cyclicTransactionsService: CyclicTransactionsService
    ) {
        this._categoriesService.categories.subscribe((categories) => {
            if (categories != undefined) {
                console.log(categories);
                this.arrayCategories = [];
                for (const [key, value] of Object.entries(categories)) {
                    this.arrayCategories.push({ value, id: key });
                }
                console.log(this.arrayCategories);
            }
        });

        this._userService.account.subscribe((data) => {
            this.initBalance = data.initBalance;
        });
        this._cyclicTransactionsService.cyclicTransactions.subscribe((data) => {
            let tempCyclicTransactions = [];
            for (const [key, value] of Object.entries(data)) {
                tempCyclicTransactions.push({ key, value });
            }
            this.cyclicTransactions = tempCyclicTransactions;
            console.log(this.cyclicTransactions);
        });
    }

    ngOnInit(): void {}

    handleEmoji(e: any, id: any) {
        console.log(id);
        console.log(e.char);
        let index = this.arrayCategories.findIndex((x) => x.id == id);
        this.arrayCategories[index].value.icon = e.char;
        console.log(this.arrayCategories);
    }

    addCategory(type: string) {
        this.arrayCategories.unshift({ id: uuid(), value: { name: 'New category', icon: '➕', type } });
    }

    saveCategories() {
        console.log('Saved');
        this._categoriesService.saveCategories(this.arrayCategories);
    }

    deleteCategory(category: any) {
        let index = this.arrayCategories.findIndex((x) => x.id == category.id);
        this.arrayCategories.splice(index, 1);
    }

    deleteCyclicTransaction(transaction: any) {
        console.log(transaction);
        this._cyclicTransactionsService.deleteCyclicTransaction(transaction.key);
    }
}
