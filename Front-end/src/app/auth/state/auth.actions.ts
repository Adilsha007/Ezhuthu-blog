import { createAction, props }  from '@ngrx/store'
import { AnyFn } from '@ngrx/store/src/selector'
import { User } from 'src/app/models/user-model'


export const signupStart = createAction('[auth page] signup start',props<{username:string, email:string, password:string}>())
export const signupSuccess = createAction('[auth page] signup success',props<{message: Object|null}>())

export const signinStart = createAction('[auth page] signin start',props<{email: string, password:string}>())
export const signinSuccess = createAction('[auth page] signin success',props<{user: User|null, redirect: boolean}>())

export const autoLogin = createAction('[auth page] auto login')
export const autoLogout = createAction('[auth page] auto logout')