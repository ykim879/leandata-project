import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  private expenseSubject = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expenseSubject.asObservable();

  private summarySubject = new BehaviorSubject<Summary[]>([
    new Summary("Food"), new Summary("Travel"), new Summary("Equipment")
  ]);
  summaries$ = this.summarySubject.asObservable();

  constructor() { }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getExpenses(): Observable<Expense[]> {
    return this.expenses$;
  }

  getSummaries(): Observable<Summary[]> {
    return this.summaries$;
  }

  getUser(userId: number) {
    const users = this.usersSubject.getValue();
    return users.filter((user) => user.id === userId)[0];
  }

  addUser(user: User) {
    const users = this.usersSubject.getValue();
    this.usersSubject.next([...users, user]);
  }

  addExpense(expense: Expense) {
    const expenses = this.expenseSubject.getValue();
    this.expenseSubject.next([...expenses, expense]);

    const users = this.usersSubject.getValue();
    const user = users.find((u) => u === expense.user);
    if (user) {
      user.totalExpense += expense.cost;
    }

    const summary = this.summarySubject.getValue();
    const index = summary.findIndex(s => s.categoryName === expense.category);
    if (index === -1) {
      summary.push(new Summary(expense.category));
    }
    summary[index].totalCost += expense.cost;
    this.summarySubject.next(summary);
  }
  
  updateExpense(updatedExpense: Expense, oldCost: number) {
    const users = this.usersSubject.getValue();
    const user = users.find((u) => u.id === updatedExpense.userId);
    if (user) {
      user.totalExpense += (updatedExpense.cost - oldCost);
      //this.updateUser(user);
    }

    const summary = this.summarySubject.getValue();
    const index = summary.findIndex(s => s.categoryName === updatedExpense.category);
    if (index !== -1) {
      summary[index].totalCost += updatedExpense.cost - oldCost;
      this.summarySubject.next(summary);
    }
  }

  deleteUser(deletedUser: User) {
    const users = this.usersSubject.getValue();
    const updatedUsers = users.filter((user) => {user !== deletedUser});
    this.usersSubject.next(updatedUsers);
    //Todo: delete expense
    const expenses = this.expenseSubject.getValue();
    expenses.forEach((expense) => {
      if (expense.user === deletedUser) {
        this.deleteExpense(expense);
      }
    })
  }

  deleteExpense(expense: Expense) {
    const expenseId = expense.expenseId;
    const expenses = this.expenseSubject.getValue();
    const updatedExpenses = expenses.filter(
      (expense) => expense.expenseId !== expenseId
    );
    this.expenseSubject.next(updatedExpenses);

    const users = this.usersSubject.getValue();
    const user = users.find((u) => u.id === expense.userId);
    if (user) {
      user.totalExpense -= expense.cost;
    }

    // Update summary
    const summary = this.summarySubject.getValue();
    const index = summary.findIndex(s => s.categoryName === expense.category);
    if (index !== -1) {
      summary[index].totalCost -= expense.cost;
      this.summarySubject.next(summary);
    }
  }
}

export class User {
  id: number;
  firstName: string;
  lastName: string;
  totalExpense: number;

  constructor(id: number, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.totalExpense = 0.0;
  }
}

export class Expense {
  expenseId: number;
  userId: number;
  user: User;
  category: string;
  description: string;
  cost: number;
  constructor(
    expenseId: number,
    user: User,
    category: string,
    description: string,
    cost: number
  ) {
    this.expenseId = expenseId;
    this.userId = user.id;
    this.user = user;
    this.category = category;
    this.description = description;
    this.cost = cost;
  }
}

export class Summary {
  categoryName: string;
  totalCost = 0;
  constructor(categoryName: string) {
    this.categoryName = categoryName;
  }
}
