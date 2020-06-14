import { Component, OnInit, Input } from '@angular/core';
import { IFinalRequest } from '../../../models/IFinalRequest';

@Component({
  selector: 'app-step-summary',
  templateUrl: './step-summary.component.html',
  styleUrls: ['./step-summary.component.scss']
})
export class StepSummaryComponent implements OnInit {
  objSummary: IFinalRequest;

  @Input()
  set summary(summary: IFinalRequest) {
    this.objSummary = summary;
  }

  constructor() { }
  folders: any[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'home',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: any[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
  ngOnInit(): void {
  }

}
