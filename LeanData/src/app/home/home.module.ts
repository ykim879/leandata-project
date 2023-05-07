import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { UsersTableComponent } from '../users-table-component/users-table-component.component';
import { HomePageRoutingModule } from './home-routing.module';
import { ExpenseTableComponent } from '../expense-table/expense-table.component';
import { SummaryTableComponent } from '../summary-table/summary-table.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, UsersTableComponent, ExpenseTableComponent, SummaryTableComponent]
})
export class HomePageModule {}
