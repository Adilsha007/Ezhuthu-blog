import { createFeatureSelector, createSelector } from "@ngrx/store"
import { SharedState } from "./shared.state"


export const shared_state_name = 'shared'


const getSharedState = createFeatureSelector<SharedState>(shared_state_name)

export const getLoading = createSelector(getSharedState, state => {
    return state.showLoading
})

export const getErrorMessage = createSelector(getSharedState,state =>{
    return state.errorMessage
})
