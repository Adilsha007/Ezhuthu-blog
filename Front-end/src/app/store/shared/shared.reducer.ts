import { createReducer, on } from "@ngrx/store";
import { loadingSpinner, setErrorMessage } from "./shared.actions";
import { initialState } from "./shared.state";

export const sharedReducer = createReducer(
    initialState,
    on(loadingSpinner,(state,action)=>{
        return {
            ...state,
            showLoading: action.status
        }
    }),
    on(setErrorMessage,(state,action)=>{
        return {
            ...state,
            errorMessage: action.message
        }
    })
    )