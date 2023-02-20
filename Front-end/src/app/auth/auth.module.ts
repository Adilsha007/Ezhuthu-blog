import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects'
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


export const routes: Routes = [
    { path: '', children: [
        { path: '', redirectTo: 'signin', pathMatch: 'full' },
        { path: 'signin', component: SigninComponent },
        {  path: 'signup', component: SignupComponent }
    ] }
]



@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        EffectsModule.forFeature(),
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ]
})


export class AuthModule {

}