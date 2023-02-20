import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', loadChildren:()=> import ('./auth/auth.module').then((m)=> m.AuthModule) },
  { path: 'profile', loadChildren:()=> import ('./profile/profile.module').then((m)=> m.ProfileModule) },
  { path: 'posts', loadChildren:()=> import ('./posts/post.module').then((m)=> m.PostsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }