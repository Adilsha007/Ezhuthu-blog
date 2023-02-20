import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../state/post.actions';
import { getPostById } from '../state/post.selector';
import { post } from '../state/post.state';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {

  post!: post;
  postForm! : FormGroup 
  postSubscription! : Subscription
  token! : string

  constructor(
    private route: ActivatedRoute, 
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService
    ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      const id = params.get('id')
      console.log(id);
      
      this.postSubscription = this.store.select(getPostById,{id}).subscribe((data)=>{
        this.post = data
        this.createForm()
      })
    })
    console.log(this.post);
    
  }

  createForm(){
     this.postForm = new FormGroup({
      title : new FormControl(this.post.title, [Validators.required, Validators.minLength(6)]),
      subtitle : new FormControl(this.post.subtitle, [Validators.required, Validators.minLength(6)]),
      description : new FormControl(this.post.description, [Validators.required, Validators.minLength(10)])
    })
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

  onSubmit(){
    if(!this.postForm.valid){
      return
    }
    
    const _id = this.post._id
    const title = this.postForm.value.title
    const subtitle = this.postForm.value.subtitle
    const description = this.postForm.value.description

    const post : post = {
        _id, title,subtitle,description
    }

    this.store.dispatch(updatePost({post}))
    this.router.navigate(['posts'])
  }



  ngOnDestroy(): void {
    if(this.postSubscription){
      this.postSubscription.unsubscribe()
    }
  }

}
