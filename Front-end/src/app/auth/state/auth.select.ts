import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthState } from './auth.state'

export const auth_state_name = 'auth'

const getAuthState = createFeatureSelector<AuthState>(auth_state_name)

export const isAuthenticated = createSelector(getAuthState,state => {
    return state.user ? true : false
})

export const getUser = createSelector(getAuthState,(state)=>{
    return state.user ? state.user.userName : null;
})

export const getToken = createSelector(getAuthState,(state)=>{
    return state.user ? state.user.userToken : null;
})