import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import { updateProfile } from '../state/profile.actions';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {


  user!: any;
  id! : string
  updateForm! : FormGroup 
  image! : File

  constructor(
    private route: ActivatedRoute, 
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService
    ){}

  ngOnInit(): void {
    this.user = this.authService.getUserFromLocalStorage()
    this.id = this.user.userId
    this.createForm()
  }

  createForm(){
    this.updateForm = new FormGroup ({
      fullname: new FormControl(this.user.fullname,[Validators.required, Validators.minLength(5)]),
      username: new FormControl(this.user.username,[Validators.required,Validators.minLength(4)]),
      phoneno: new FormControl(this.user.phoneno,[Validators.required,Validators.minLength(10)]),
      email: new FormControl(this.user.email,[Validators.required,Validators.email]),
      gender: new FormControl(this.user.gender,[Validators.required]),
      image: new FormControl('',[Validators.required,requiredFileType('jpg')]),
      // fileSource: new FormControl('', [Validators.required])
    })
  }



  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
       this.image = event.target.files[0];
      // console.log(this.image);
      
      // this.updateForm.patchValue({
      //   fileSource: this.im
      // });
    }
  }

  //   descriptionError():any{
  //   const formDescription = this.postForm.controls['description']
  //   if(formDescription?.touched && !formDescription?.valid){
  //     if(formDescription.errors?.['required']){
  //       return 'Description is required'
  //     }else if(formDescription.errors?.['minLength']){
  //       return 'Description should be minimum 10 characters'
  //     }
  //     return null
  //   }
  // }

  onSubmit(){
    if(!this.updateForm.valid){
      console.log('not valid');
      
      return
    }


    const  fullname= this.updateForm.value.fullname
    const  username= this.updateForm.value.username
    const  phoneno=this.updateForm.value.phoneno
    const  email = this.updateForm.value.email
    const  gender = this.updateForm?.get('gender')?.value;
    const    id = this.id
    const fileSource  = this.updateForm.get('fileSource')?.value;
    const img = this.image

    const user = {fullname, username, phoneno, email, gender, id,img}
    
    console.log(this.image);
    
    const formData = new FormData()
    const blob = new Blob()
    formData.append('fullname',blob,fullname)
    formData.append('username',blob,username)
    formData.append('phoneno',blob,phoneno)
    formData.append('email',blob,email)
    formData.append('gender',blob,gender)
    formData.append('id',blob,id)
    // console.log(formData);
   
    formData.set('file',this.image)

    console.log(formData);
    

    
  //  console.log(formData);
   
    
    this.store.dispatch(updateProfile({user}))
    this.router.navigate(['profile'])
  }



  // ngOnDestroy(): void {
  //   if(this.postSubscription){
  //     this.postSubscription.unsubscribe()
  //   }
  // }


}
// function requiredFileType(arg0: string): import("@angular/forms").ValidatorFn {
//   throw new Error('Function not implemented.');
// }


import { AbstractControl } from '@angular/forms';

export function requiredFileType(fileType: string): ValidatorFn {
  console.log('inside file type checker');
  
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;
    console.log(file);
    
    if (file) {
      const extension = file.split('.').pop();
      if (extension !== fileType) {
        return { requiredFileType: true };
      }
    }
    return null;
  };
}


