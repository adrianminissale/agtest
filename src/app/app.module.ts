import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

import { AppState } from 'src/app/state';

import { DeletePostComponent } from './components/deletePost/deletePost.component';
import { SearchComponent } from './components/search/search.component';
import { PostsListComponent } from './components/postsList/postsList.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PostComponent } from './components/post/post.component';
import { EditPostComponent } from './components/editPost/editPost.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PostsListComponent,
    PaginationComponent,
    PostComponent,
    DeletePostComponent,
    TopbarComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([AppState], { developmentMode: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
