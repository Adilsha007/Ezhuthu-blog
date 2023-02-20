import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { isAuthenticated } from '../../auth/state/auth.select';
import { AppState } from 'src/app/store/app.state';
import { deletePost, loadPosts } from '../state/post.actions';
import { getPosts } from '../state/post.selector';
import { post } from '../state/post.state';

@Component({
  selector: 'app-posts-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts!: Observable<post[]>;
  isAuthenticated!: Observable<boolean>
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
    this.isAuthenticated =  this.store.select(isAuthenticated)
  }

  

  onDeletePost(id: string){
    if(confirm('Are you sure?')){
      this.store.dispatch(deletePost({id}))
    }
  }


}
