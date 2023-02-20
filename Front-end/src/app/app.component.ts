import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogin } from './auth/state/auth.actions';
import { AppState } from './store/app.state';
import { getErrorMessage, getLoading } from './store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-end';
  showLoading!: Observable<boolean>
  
  
  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading)
    
    this.store.dispatch(autoLogin())
  }
}
