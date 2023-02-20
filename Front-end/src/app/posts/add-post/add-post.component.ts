import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../state/post.actions';
import { post } from '../state/post.state';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  postForm!: FormGroup;

  constructor(
    private store: Store<AppState>, 
    private authService: AuthService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title : new FormControl(null, [Validators.required, Validators.minLength(6)]),
      subtitle : new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description : new FormControl(null, [Validators.required, Validators.minLength(10)])
    })
  }

  onSubmit(){
    if(!this.postForm.valid){
      return
    }

    const post : post = {
        title: this.postForm.value.title,
        subtitle:this.postForm.value.subtitle,
        description: this.postForm.value.description
    }

    this.store.dispatch(addPost({post}))
    this.router.navigate(['/posts'])
  }

  descriptionError():any{
    const formDescription = this.postForm.controls['description']
    if(formDescription?.touched && !formDescription?.valid){
      if(formDescription.errors?.['required']){
        return 'Description is required'
      }else if(formDescription.errors?.['minLength']){
        return 'Description should be minimum 10 characters'
      }
      return null
    }
  }

}
