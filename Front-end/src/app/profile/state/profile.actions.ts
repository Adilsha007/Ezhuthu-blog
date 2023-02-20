import { createAction, props } from "@ngrx/store";


export const updateProfile = createAction('[profile page] updating user profile',props<{user:any}>())
export const updateProfileSuccess = createAction('[profile page] profile updated',props<{user:any}>())