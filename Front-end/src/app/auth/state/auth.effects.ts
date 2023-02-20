import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, catchError, of, mergeMap } from 'rxjs'
import { autoLogin, autoLogout, signinStart, signinSuccess, signupStart, signupSuccess } from "./auth.actions";
import { AuthService } from '../../services/auth.service'
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { loadingSpinner, setErrorMessage } from "src/app/store/shared/shared.actions";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
    constructor( 
        private actions$:Actions,
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router
    ){}


    signup$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(signupStart),
            exhaustMap((action)=>{
                return this.authService.signup(action.username,action.email,action.password).pipe(
                    map((data)=>{
                        const message = data
                        this.store.dispatch(loadingSpinner({status: false}))
                        this.store.dispatch(setErrorMessage({message: ''}))
                        return signupSuccess({message})
                    })
                )
            }),
            catchError((errorResp)=>{
                        const errorMessage = errorResp.error.message
                        this.store.dispatch(loadingSpinner({status: false}))
                        return of(setErrorMessage({message: errorMessage}))
                    })
        )
    })



    signupRedirect$ = createEffect(()=> {
        return this.actions$.pipe(
            ofType(signupSuccess), 
            map((action)=>{
                this.router.navigate(['/auth/signin'])
        }))
    },{
        dispatch: false
    })


    signin$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(signinStart),
            exhaustMap((action)=>{
                return this.authService.signin(action.email,action.password).pipe(
                    map((data)=>{
                        const user = this.authService.formatUser(data)
                        this.store.dispatch(loadingSpinner({status: false}))
                        this.store.dispatch(setErrorMessage({message: ''}))
                        this.authService.setUserInLocalStorage(user)
                        return signinSuccess({user, redirect: true})
                    }),
                    catchError((errorResp)=>{
                        const errorMessage = errorResp.error.message
                        this.store.dispatch(loadingSpinner({status: false}))
                        return of(setErrorMessage({message: errorMessage}))
                    })
                )
            })
        )
    })



    signinRedirect$ = createEffect(()=> {
        return this.actions$.pipe(
            ofType(signinSuccess), 
            map((action)=>{
                if(action.redirect){
                this.router.navigate(['/'])
                }
        }))
    },{
        dispatch: false
    })



    autoLogin$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(autoLogin),
            mergeMap((action)=>{
                const user = this.authService.getUserFromLocalStorage()
                return of(signinSuccess({user, redirect: false}))
                
            })
        )
    })


    logout$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(autoLogout),
            map((action)=>{
                const resp = this.authService.logout()
                this.router.navigate(['auth'])
            })
        )
    },{
        dispatch: false
    })


}