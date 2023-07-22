import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsListComponent } from './components/postsList/postsList.component';
import { PostComponent } from './components/post/post.component';
import { DeletePostComponent } from './components/deletePost/deletePost.component';

const routes: Routes = [
  { path: '', component: PostsListComponent },
  { path: ':id', component: PostComponent },
  { path: ':id/delete', component: DeletePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
