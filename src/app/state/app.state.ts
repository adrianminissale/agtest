import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { patch, append } from '@ngxs/store/operators';

import { AppStateAction } from './app.actions';
import { AppStateModel } from './app.model';

@State<AppStateModel>({
  name: 'app',
  defaults: {
    pagination: 1,
    posts: [],
    updatedPosts: {},
    links: {},
    search: ''
  },
})
@Injectable()
export class AppState {
  @Action(AppStateAction.Pagination)
  AppStatePagination(ctx: StateContext<AppStateModel>, actions: AppStateAction.Pagination) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      pagination: actions.payload,
    });
  }

  @Action(AppStateAction.Posts)
  AppStatePosts(ctx: StateContext<AppStateModel>, actions: AppStateAction.Posts) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      posts: actions.payload,
    });
  }

  @Action(AppStateAction.UpdatedPosts)
  AppStateUpdatedPosts(ctx: StateContext<AppStateModel>, actions: AppStateAction.UpdatedPosts) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      updatedPosts: { ...state.updatedPosts, [actions.payload.id]: actions.payload }
    });
  }

  @Action(AppStateAction.Links)
  AppStateLinks(ctx: StateContext<AppStateModel>, actions: AppStateAction.Links) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      links: actions.payload,
    });
  }

  @Action(AppStateAction.Search)
  AppStateSearch(ctx: StateContext<AppStateModel>, actions: AppStateAction.Search) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      search: actions.payload,
    });
  }

  @Selector()
  static Pagination(state: AppStateModel) {
    return state.pagination;
  }

  @Selector()
  static Posts(state: AppStateModel) {
    return state.posts;
  }

  @Selector()
  static UpdatedPosts(state: AppStateModel) {
    return state.updatedPosts;
  }

  @Selector()
  static Links(state: AppStateModel) {
    return state.links;
  }

  @Selector()
  static Search(state: AppStateModel) {
    return state.search;
  }
}