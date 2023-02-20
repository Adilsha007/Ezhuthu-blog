import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { loadingSpinner } from 'src/app/store/shared/shared.actions';
import { getErrorMessage } from 'src/app/store/shared/shared.selector';
import { signinStart } from '../state/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm! : FormGroup
  errorMessage! : Observable<string>

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {

    this.signinForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(4)])
    })
    
  }

  onSignin(){
  
    const email = this.signinForm.value.email
    const password = this.signinForm.value.password
   this.store.dispatch(loadingSpinner({status: true}))
   this.errorMessage = this.store.select(getErrorMessage)
    this.store.dispatch(signinStart({email,password}))
  }

}
