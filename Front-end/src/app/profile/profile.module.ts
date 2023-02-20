import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { ProfileComponent } from "./user-profile/profile.component";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuard } from "../services/auth.guard";
import { profileReducer } from "./state/profile.reducer";
import { ProfileEffects } from "./state/profile.effects";


export const routes: Routes = [
    { path:'', component: ProfileComponent, canActivate: [AuthGuard],
    // children: [
    //     { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
    //     { path: 'user-profie', component: ProfileComponent }
    // ] 
},
{ path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] }
]

@NgModule({
    declarations:[
    EditProfileComponent
  ],
    imports:[
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('profile', profileReducer),
    EffectsModule.forFeature([ProfileEffects])
    ]
})


export class ProfileModule {

}