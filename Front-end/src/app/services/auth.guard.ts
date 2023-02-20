import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { isAuthenticated } from "../auth/state/auth.select";
import { AppState } from "../store/app.state";



@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>, private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): boolean 
        | UrlTree 
        | Observable<boolean | UrlTree> 
        | Promise<boolean | UrlTree> {

            return this.store.select(isAuthenticated).pipe(
                map((authenticate)=>{
                    if(!authenticate){
                        return this.router.createUrlTree(['auth'])
                    }
                    return true
                })
            )
    }

}