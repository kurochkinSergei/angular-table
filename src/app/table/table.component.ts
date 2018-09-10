import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  users: any;
  loading: boolean;
  usersURL: string;

  constructor(private http: HttpClient) {
    this.users = [];
    this.usersURL = 'https://gist.githubusercontent.com/bunopus/f48fbb06578003fb521c7c1a54fd906a/raw/e5767c1e7f172c6375f064a9441f2edd57a79f15/test_users.json';
  }

  ngOnInit() {
    this.loading = true;
    this.http.get(this.usersURL)
      .subscribe((data) => {
        // TODO fail check
        this.users = data;
        this.loading = false;
      });
  }
}
