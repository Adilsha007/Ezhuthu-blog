import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { AuthGuard } from "../services/auth.guard";
import { PostListComponent } from "./post-list/post-list.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { AddPostComponent } from "./add-post/add-post.component";
import { postReducer } from "./state/post.reducer";
import { PostEffects } from "./state/post.effects";
import { ViewPostComponent } from './view-post/view-post.component';



export const routes: Routes = [
    { path:'', component: PostListComponent, canActivate: [AuthGuard]},
    { path: 'add-post', component: AddPostComponent},
    { path: 'edit-post/:id', component: EditPostComponent },
    { path: 'view-post/:id', component: ViewPostComponent }
]

@NgModule({
    declarations:[
    PostListComponent,
    EditPostComponent,
    AddPostComponent,
    ViewPostComponent
  ],
    imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('posts', postReducer),
    EffectsModule.forFeature([PostEffects])
    ]
})


export class PostsModule {

}