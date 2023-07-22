import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { AppState, AppStateAction } from 'src/app/state';
import { Component, OnDestroy, OnInit } from '@angular/core';

const GET_POSTS = gql`
  query (
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title
      }
      links {
        first {
          page
        }
        prev {
          page
        }
        next {
          page
        }
        last {
          page
        }
      }
    }
  }
`;

@Component({
  selector: 'app-posts-list',
  templateUrl: './postsList.component.html',
  styleUrls: ['./postsList.component.scss'],
})

export class PostsListComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  posts: any[] = [];
  links: {} = {};
  updatedPosts: any = {};
  search: string = '';
  limit: number = 25;
  pagination: number = 1;

  private pagination$ = this.store.select(AppState.Pagination);
  private search$ = this.store.select(AppState.Search);
  private links$ = this.store.select(AppState.Links);
  private updatedPosts$ = this.store.select(AppState.UpdatedPosts);
  private querySubscription!: Subscription;

  constructor(
    private apollo: Apollo,
    private store: Store,
  ) {
    this.pagination$.subscribe((value) => {
      this.pagination = value;
      this.loading = true;
      this.requestPosts(this.pagination, this.search);
    });
    this.search$.subscribe((value) => {
      this.search = value;
      this.requestPosts(1, value);
    });
    this.links$.subscribe((value) => {
      this.links = value;
    });
    this.updatedPosts$.subscribe((value) => {
      this.updatedPosts = value;
    });
  }

  filterPosts = (posts: [{id: string}]) => {
    return posts.map(post => this.updatedPosts[ post.id ]?.id === post.id ? this.updatedPosts[ post.id ] : post ).filter(post => this.updatedPosts[ post.id ]?.deleted !== true);
  }

  requestPosts(page: number = 1, search: string = '') {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: GET_POSTS,
        variables: {
          "options": {
            "paginate": {
              "page": page,
              "limit": this.limit
            },
            "search": {
              "q": search
            }
          }
        }
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.posts = this.filterPosts(data.posts.data);
        this.store.dispatch(new AppStateAction.Posts(data.posts.data));
        this.store.dispatch(new AppStateAction.Links(data.posts.links));
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
