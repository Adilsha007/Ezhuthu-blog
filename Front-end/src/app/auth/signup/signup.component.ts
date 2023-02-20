import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Store } from '@ngrx/store';
import { loadingSpinner } from 'src/app/store/shared/shared.actions';
import { AppState } from '../../store/app.state';
import { signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm! : FormGroup

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(4)])
    })
  }

  onSignup(){
    if(!this.signupForm.valid){
      return
    }
    
    const username = this.signupForm.value.username
    const email = this.signupForm.value.email
    const password = this.signupForm.value.password
    this.store.dispatch(loadingSpinner({status: true}))
    this.store.dispatch(signupStart({username,email,password}))

  }

}
