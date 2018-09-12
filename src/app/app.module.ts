import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { TableRowComponent } from './table-row/table-row.component';
import { TableFilterComponent } from './table-filter/table-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableRowComponent,
    TableFilterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
