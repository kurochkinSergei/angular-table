import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-row',
  template: '<td *ngFor="let item of items">{{ item }}</td>',
  styleUrls: ['./table-row.component.scss'],
})

export class TableRowComponent implements OnInit {
  @Input() rowData: Object;
  @Input() keysToRender: string[];
  items: string[];

  constructor() {
    // this.dataToRender = this.keysToRender.reduce((acc, cur, i, arr) => {
    //   acc[arr[i]] = this.rowData[cur];
    //   return acc;
      // if (this.rowData.hasOwnProperty(key)) {

      // } else {
      //   return
      // }
      // (typeof !this.rowData === 'object' || Array.isArray(props[propName]))

    // },{});
  }

  ngOnInit() {
    // transform rowData object to an ordered array of items
    // order depends on keysToRender array
    this.items = this.keysToRender.map((key) => {
      if (!this.rowData.hasOwnProperty(key)) {
        return ' - ';
      }

      // check if item is not object i.e. address
      if (!(typeof this.rowData[key] === 'object')
        || Array.isArray(this.rowData[key])) {
        return this.rowData[key];
      }

      // otherwise item is object
      let itemValue = '';
      for (const property in this.rowData[key]) {
        if (this.rowData[key].hasOwnProperty(property)) {
          // concatenate fields
          itemValue = `${itemValue}${this.rowData[key][property]}, `;
        }
      }
      return itemValue.slice(0, -2);
    });
  }
}
