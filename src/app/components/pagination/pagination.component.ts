import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppState, AppStateAction } from 'src/app/state';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})

export class PaginationComponent {
  links: any = {};

  private links$ = this.store.select(AppState.Links);

  constructor(
    private store: Store,
  ) {
    this.links$.subscribe((value) => {
      this.links = value;
    });
  }

  goToPage(page: number) {
    if (!page) {
      return
    }
    this.store.dispatch(new AppStateAction.Pagination(page));
  }
}
