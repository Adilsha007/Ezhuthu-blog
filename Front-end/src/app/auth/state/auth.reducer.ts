import { createReducer, on } from "@ngrx/store";
import {  autoLogout, signinSuccess, signupSuccess } from "./auth.actions";
import { initialState } from "./auth.state";

export const authReducer = createReducer(
    initialState,
    on(signinSuccess,(state,action)=>{
        return {
            ...state,
            user: action.user
        }
    }),
    on(signupSuccess,(state, action)=>{
    
        return {
            ...state,
            user: null
        }
    }),
    on(autoLogout,(state,action)=>{
        return {
            ...state,
            user: null
        }
    })
    
)