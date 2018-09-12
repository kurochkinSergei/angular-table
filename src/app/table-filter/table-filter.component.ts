import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent implements OnInit {
  filters: Object[];

  constructor() {
    this.filters = [
      {
        label: 'Пол',
        entries: [{
          value:'male',
          count: 4,
        },
        {
          value:'female',
          count: 3,
        },
        ],
      },
      {
        label: 'Департамент',
        entries: [{
          value:'Пупа',
          count: 4,
        },
        {
          value:'Лупа',
          count: 3,
        },
        {
          value:'Лупа',
          count: 3,
        },
        ],
      },
      {
        label: 'Город',
        entries: [{
          value:'Зажопинск',
          count: 4,
        },
        {
          value:'Залупинск',
          count: 2,
        },
        {
          value:'Хуйпоймигдеиво',
          count: 1,
        },
        ],
      },
    ];
  }

  ngOnInit() {
  }

}
