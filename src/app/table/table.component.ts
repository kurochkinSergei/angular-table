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

  constructor(private http: HttpClient) {
    this.shownRows = [];
    this.keysToRender = ['name', 'age', 'gender', 'department', 'address'];
    this.headerData = { name: 'Имя', age: 'Возраст', gender: 'Пол', department: 'Департамент', address: 'Адрес' };
    this.bodyDataURL = 'https://gist.githubusercontent.com/bunopus/f48fbb06578003fb521c7c1a54fd906a/raw/e5767c1e7f172c6375f064a9441f2edd57a79f15/test_users.json';
  }

  ngOnInit() {
    this.loading = true;
    this.http.get(this.bodyDataURL)
      .subscribe((data) => {
        // TODO fail check

        // create list of unique keys of all objects and return it
        this.bodyData = data;
        this.loading = false;
      });

    this.sortStatus = this.keysToRender.reduce(
      (prev, cur, i, arr) => {
        // 0 - not sorted, 1 - asc, -1 - desc
        prev[arr[i]] = 0;
        return prev;
      },
      {},
    );
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
    const keyType = typeof this.bodyData[0][sortKey];
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
    const sortedbodyData = this.bodyData.sort((a, b) => compFunc(a[sortKey], b[sortKey], sortDirection, this));
    // update sortStatus
    this.sortStatus[sortKey] = sortDirection;
    // rerender table
    this.bodyData = sortedbodyData;
  }
}
