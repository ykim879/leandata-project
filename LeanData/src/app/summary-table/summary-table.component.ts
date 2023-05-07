import { Component, OnInit } from '@angular/core';
import { DataService, Summary } from '../data-service.service';

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
})
export class SummaryTableComponent  implements OnInit {

  summaries: Summary[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getSummaries().subscribe(summaries => {
      this.summaries = summaries;
    });
  }

}
