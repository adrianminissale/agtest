import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})

export class PostComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  post: any = {};

  private querySubscription!: Subscription;

  constructor(
    private apollo: Apollo,
    private router: Router,
  ) { }

  ngOnInit() {
    const ID = this.router.url.split('/').pop() || '';

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_POST(ID)
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
