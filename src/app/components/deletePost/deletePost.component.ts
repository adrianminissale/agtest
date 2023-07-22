import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState, AppStateAction } from 'src/app/state';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

const DELETE_POST = gql`
  mutation (
    $id: ID!
  ) {
    deletePost(id: $id)
  }
`;

@Component({
  selector: 'app-delete-post',
  templateUrl: './deletePost.component.html',
})

export class DeletePostComponent implements OnInit, OnDestroy {
  deleted: boolean = false;
  updatedPosts: any = [];

  private updatedPosts$ = this.store.select(AppState.UpdatedPosts);
  private querySubscription!: Subscription;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private store: Store,
  ) {
    this.updatedPosts$.subscribe((value) => {
      this.updatedPosts = value;
    });
  }

  ngOnInit() {
    const ID = this.router.url.split('/')[1] || '';

    this.querySubscription = this.apollo
      .mutate({
        mutation: DELETE_POST,
        variables: {
          id: ID,
        },
      })
      .subscribe(
        ({ data }: any) => {
          this.deleted = data.deletePost;
          const post: any = {
            id: ID,
            deleted: data.deletePost,
          };
          this.store.dispatch(new AppStateAction.UpdatedPosts(post));
        },
        error => {
          console.error(error);
        },
      );
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
