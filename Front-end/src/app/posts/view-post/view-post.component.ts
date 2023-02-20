import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { skipWhile, Subscription, take } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/post.selector';
import { post } from '../state/post.state';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  post: post | undefined;
  postSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log(id);

      if (id) {
        this.postSubscription = this.store.select(getPostById, { id }).subscribe((data) => {
          console.log(data);
          this.post = data;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}

