import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppStateAction } from 'src/app/state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})

export class SearchComponent {
  @ViewChild('search') search: any;

  constructor(
    private store: Store,
  ) { }

  onSearch(query: string) {
    this.search.nativeElement.value = query;
    this.store.dispatch(new AppStateAction.Search(query));
  }
}
