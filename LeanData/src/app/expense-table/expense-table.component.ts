import { Component, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { User, Expense, DataService } from '../data-service.service';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html'
})
export class ExpenseTableComponent  implements OnInit {

  users: User[] = [];
  expenses: Expense[] = [];
  categories = ["Food", "Travel", "Equipment"];
  currentCategory = "";
  currentUser: User;
  description = "";
  cost: number | null;
  newExpenseId = 0;
  constructor(private dataService: DataService) {
    this.currentUser = new User(-1, "", "");
    this.cost = null;
  }

  ngOnInit() {
    this.dataService.getUsers().subscribe((users) => {
      this.users = users;
    });

    this.dataService.getExpenses().subscribe((expenses) => {
      this.expenses = expenses;
    });
  }

  selectUser(user: User) {
    //check currentUser behavior when user is deleted
    this.currentUser = user;
  }

  selectCategory(category : string) {
    this.currentCategory = category;
  }

  addExpense() {
    if (this.currentUser.id !== -1 && this.cost && this.description.trim() && this.currentCategory.trim()) {
      this.dataService.addExpense(new Expense(this.newExpenseId, this.currentUser.id, this.currentUser.firstName + " " + this.currentUser.lastName,
      this.currentCategory, this.description, this.cost));
      this.newExpenseId += 1;
    } else {
      console.log(this.currentUser.id)
      console.log("wrong input")
    }
  }

  editExpense(expense: Expense, descriptionInput: IonInput, costInput: IonInput) {
    const description = (descriptionInput.value || '').toString().trim();
    const cost = costInput.value? Number(costInput.value) : null;
    if (expense.userId !== -1 && description && cost) {
      expense.description = description;
      const oldCost = expense.cost;
      expense.cost = cost;
      this.dataService.updateExpense(expense, oldCost);
    }
    descriptionInput.value = expense.description;
  }

  deleteExpense(expense: Expense) {
    this.dataService.deleteExpense(expense);
  }
}
