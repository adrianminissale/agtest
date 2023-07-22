import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { AppStateAction } from 'src/app/state';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

const GET_POST = (ID: string) => gql`
  query {
    post(id: "${ID}") {
      id
      title
      body
    }
  }
`;
const UPDATE_POST = gql`
  mutation (
    $id: ID!,
    $input: UpdatePostInput!
  ) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
    }
  }
`;

@Component({
  selector: 'app-edit-post',
  templateUrl: './editPost.component.html',
})

export class EditPostComponent implements OnInit, OnDestroy {
  @ViewChild('title') title: any;
  @ViewChild('body') body: any;
  loading: boolean = true;
  post: any = {};
  ID: string = this.router.url.split('/')[1] || '';

  private querySubscription!: Subscription;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private store: Store,
  ) { }

  onSave(title: string, body: string) {
    this.querySubscription = this.apollo
      .mutate({
        mutation: UPDATE_POST,
        variables: {
          id: this.ID,
          input: {
            body: body,
            title: title
          }
        },
      })
      .subscribe(
        ({ data }: any) => {
          const post: any = {
            id: this.ID,
            deleted: false,
            title: title,
            body: body,
          };
          this.store.dispatch(new AppStateAction.UpdatedPosts(post));
        },
        error => {
          console.error(error);
        },
      );
  }

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_POST(this.ID)
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.post = data.post;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
