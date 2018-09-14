import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent implements OnInit {
  filtersState: Object;
  inputs: NodeListOf<HTMLInputElement>;
  @Input() filters: Object[];
  @Input() prevAppliedFilters: Object;
  @Output() appliedFilters: EventEmitter<Object> = new EventEmitter<Object>();
  constructor() {
    this.inputs = document.getElementsByTagName('input');
    this.filtersState = {
    } ;
  }

  filterTable() :void {
    const newAppFilters = {};

    for (let i = 0; i < this.inputs.length; i = i + 1) {
      const input = this.inputs[i];
      if (input.checked) {
        const filterName = input.getAttribute('data-filter-name');
        // really proud of it
        newAppFilters[filterName] = [... newAppFilters[filterName] || [], input.name];
      }
    }

    this.filtersState = newAppFilters;
    this.appliedFilters.emit(newAppFilters);
  }

  ngOnInit() {
  }
}
