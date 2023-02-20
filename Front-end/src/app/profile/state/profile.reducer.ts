import { createReducer, on } from "@ngrx/store";
import { initialState } from "src/app/auth/state/auth.state";
import { updateProfileSuccess } from "./profile.actions";
import { initialValue } from "./profile.state";

export const profileReducer = createReducer(
    initialState,
    on(updateProfileSuccess,(state,action)=>{
        
        return {
            ...state,
            user: action.user
        }
    })
    
)