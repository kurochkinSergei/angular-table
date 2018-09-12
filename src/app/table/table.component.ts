import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})

export class TableComponent implements OnInit {
  bodyData: any;
  headerData: any;
  shownRows: any;
  sortStatus: Object;
  loading: boolean;
  bodyDataURL: string;
  keysToRender: string[];
  filters: Object[];
  appliedFilters: Object;
  allowedValues: string[];

  constructor(private http: HttpClient) {
    this.allowedValues = ['Hr'];
    this.keysToRender = ['name', 'age', 'gender', 'department', 'address'];
    this.headerData = { name: 'Имя', age: 'Возраст', gender: 'Пол', department: 'Департамент', address: 'Адрес' };
    this.appliedFilters = { gender: [], department: [], address: [] };
    this.bodyDataURL = 'https://gist.githubusercontent.com/bunopus/f48fbb06578003fb521c7c1a54fd906a/raw/e5767c1e7f172c6375f064a9441f2edd57a79f15/test_users.json';
    this.filters = [{
      label: 'Пол',
      name: 'gender',
    },
    {
      label: 'Департамент',
      name: 'department',
    },
    {
      label: 'Адрес',
      name: 'address',
    }];
  }

  ngOnInit() {
    this.loading = true;
    this.http.get(this.bodyDataURL).subscribe((data) => {
      // TODO fail check

      // create list of unique keys of all objects and return it
      this.bodyData = data;
      this.shownRows = data;
      this.loading = false;

      // generate filters according to data
      this.filters = this.setFilters(data, this.filters);
    });

    // assign sort status for each column to 0
    this.sortStatus = this.keysToRender.reduce(
      (prev, cur, i, arr) => {
        // 0 - not sorted, 1 - asc, -1 - desc
        prev[arr[i]] = 0;
        return prev;
      },
      {},
    );
  }

  // maybe its better to manage filter logic in table-filter-component
  // but it requires passing table data to it
  setFilters(data, filters) {
    const newFilters = filters.map((filter) => {
      // allEntries is array of all values of a given key
      const allEntries = data.map((row, i) => {
        return typeof row[filter['name']] === 'object' ? row[filter['name']]['city'] : row[filter['name']];
      });

      // count occurances of each value and keep only unique values in obj
      const entriesObj = allEntries.reduce((prev, cur) => {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      },
        {},
      );

      const entries = [];

      // create array of objects like [{ value:'hello', count: 1 }, { value:'world', count: 2 }];
      // out of { hello: 1, world: 2 } object
      for (const property in entriesObj) {
        if (entriesObj.hasOwnProperty(property)) {
          entries.push({ value: property, count: entriesObj[property] });
        }
      }
      return { ...filter, entries };
    });

    // console.log(newFilters);

    return newFilters;
  }

  filterTable(appliedFilters: Object) {
    let filteredData = this.bodyData;
    this.allowedValues = [];

    for (const property in appliedFilters) {
      if (appliedFilters.hasOwnProperty(property)) {
        filteredData = filteredData.filter((row) => {
          let valueSuitsFilter = false;
          // HARDCODE
          const compRowVal = typeof row[property] === 'object' ? row[property]['city'] : row[property];
          // this.allowedValues.push()
          appliedFilters[property].forEach((filterVal) => {
            if (compRowVal === filterVal) {
              valueSuitsFilter = true;
            }
          });
          return valueSuitsFilter;
        });
      }
    }

    this.filters = this.setFilters(filteredData, this.filters);
    this.shownRows = filteredData;
  }

  concatObj(o) {
    let itemValue = '';
    for (const property in o) {
      if (o.hasOwnProperty(property)) {
        // concatenate fields
        itemValue = `${itemValue}${o[property]}, `;
      }
    }
    return itemValue.slice(0, -2);
  }

  numCompFunc(a, b, dir) {
    return (a - b) * dir;
  }

  strCompFunc(a, b, dir) {
    if (a > b) {
      return dir;
    }
    if (a < b) {
      return -dir;
    }
    return 0;
  }

  objCompFunc(a, b, dir, self) {
    return self.strCompFunc(self.concatObj(a), self.concatObj(b), dir);
  }

  sortTable(sortKey: string) {
    const keyType = typeof this.shownRows[0][sortKey];
    // if table wasn't sorted or sorted descending, sort it ascending
    const sortDirection = this.sortStatus[sortKey] === 1 ? -1 : 1;
    // choose function to sort
    let compFunc;
    if (keyType === 'number') {
      compFunc = this.numCompFunc;
    } else if (keyType === 'string') {
      compFunc = this.strCompFunc;
    } else {
      compFunc = this.objCompFunc;
    }
    // sortbodyData
    const sortedbodyData = this.shownRows.sort((a, b) => compFunc(a[sortKey], b[sortKey], sortDirection, this));
    // update sortStatus
    this.sortStatus[sortKey] = sortDirection;
    // rerender table
    this.shownRows = sortedbodyData;
  }
}
