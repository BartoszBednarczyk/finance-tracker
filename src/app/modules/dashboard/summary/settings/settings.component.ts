import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { v4 as uuid } from 'uuid';
@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    categories: any;
    arrayCategories: any[] = [];
    constructor(private _categoriesService: CategoriesService) {
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
}
