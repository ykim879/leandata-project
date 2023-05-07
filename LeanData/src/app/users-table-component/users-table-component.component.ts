import { Component, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { first } from 'rxjs';
import { DataService, User } from '../data-service.service';

@Component({
  selector: 'app-users-table-component',
  templateUrl: './users-table-component.component.html',
})
export class UsersTableComponent implements OnInit {
  firstName = '';
  lastName = '';
  users: User[] = [];
  newId = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  addUser() {
    if (this.firstName && this.lastName) {
      this.dataService.addUser(
        new User(this.newId, this.firstName, this.lastName)
      );
      this.firstName = '';
      this.lastName = '';
      this.newId += 1;
    }
  }

  editUser(
    user: User,
    firstNameInput: IonInput,
    lastNameInput: IonInput
  ) {
    const firstName = (firstNameInput.value|| '').toString().trim();
    const lastName =  (lastNameInput.value || '').toString().trim();
    if (firstName && lastName) {
      user.firstName = firstName;
      user.lastName = lastName;
      this.dataService.updateUser(user);
    }
    firstNameInput.value = user.firstName;
    lastNameInput.value = user.lastName;
  }

  deleteUser(user: User) {
    this.dataService.deleteUser(user.id);
  }
}
