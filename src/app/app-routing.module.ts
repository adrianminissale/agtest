import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsListComponent } from './components/postsList/postsList.component';
import { PostComponent } from './components/post/post.component';
import { DeletePostComponent } from './components/deletePost/deletePost.component';
import { EditPostComponent } from './components/editPost/editPost.component';

const routes: Routes = [
  { path: '', component: PostsListComponent },
  { path: ':id', component: PostComponent },
  { path: ':id/delete', component: DeletePostComponent },
  { path: ':id/edit', component: EditPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
