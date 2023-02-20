import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, mergeMap, Observable, of, switchMap } from "rxjs";
import { signinSuccess } from "src/app/auth/state/auth.actions";
import { AuthService } from "src/app/services/auth.service";
import { ProfileService } from "src/app/services/profile.service";
import { updateProfile } from "./profile.actions";


@Injectable()

export class ProfileEffects {
    constructor(
        private actions$: Actions, 
        private profileService: ProfileService,
        private authService: AuthService,
        private router: Router
        ){}


updateProfile$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(updateProfile),
            exhaustMap((action)=>{
                return this.profileService.updateProfile(action.user).pipe(
                    map((data)=>{
                        const user = this.authService.formatUser(data)
                        this.authService.setUserInLocalStorage(user)
                        return signinSuccess({user,redirect: true})
                    })
                )
            })
        )
    })


}



