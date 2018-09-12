import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
})

export class TableRowComponent implements OnInit {
  items: Object[];
  @Input() rowData: Object;
  @Input() keysToRender: string[];
  @Input() isHeader: boolean;

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sortKey: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  filterTable($event) {
    this.sortKey.emit($event.currentTarget.getAttribute('data-key'));
    // this.loading.emit(true);
  }

  ngOnInit() {
    // transform rowData object to an ordered array of objects
    // order depends on keysToRender array
    this.items = this.keysToRender.map((key) => {
      const item = {
        key,
        value: ''};
      if (!this.rowData.hasOwnProperty(key)) {
        item.value = ' - ';
        return item;
      }

      // check if item is not object i.e. address
      if (!(typeof this.rowData[key] === 'object')
        || Array.isArray(this.rowData[key])) {
        item.value = this.rowData[key];
        return item;
      }

      // otherwise item is object
      let itemValue = '';
      for (const property in this.rowData[key]) {
        if (this.rowData[key].hasOwnProperty(property)) {
          // concatenate fields
          itemValue = `${itemValue}${this.rowData[key][property]}, `;
        }
      }
      item.value = itemValue.slice(0, -2);
      return item;
    });
  }
}
