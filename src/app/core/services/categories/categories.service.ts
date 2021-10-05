import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  uid: string = '';
  categories: Observable<any> = new Observable();

  constructor(private afTransactions: AngularFirestore) { }

  getCategories(uid: string): void {
    // TODO: Sprawdzać czy jest pusty
    this.uid = uid;
    this.categories = this.afTransactions.collection<any>(uid).doc('categories').valueChanges();
  }

  saveCategories(arrayCategories: any[]): void {
    console.log(this.categories);
    console.log(arrayCategories);
    let newCategories: any = {};
    arrayCategories.map(category => {
      newCategories[category.id] = {icon: "", name: "", type: ""};
      newCategories[category.id].icon = category.value.icon;
      newCategories[category.id].name = category.value.name;
      newCategories[category.id].type = category.value.type;
    })

    console.log(newCategories);
    this.afTransactions.collection<any>(this.uid).doc('categories').set(newCategories);
  }
}
