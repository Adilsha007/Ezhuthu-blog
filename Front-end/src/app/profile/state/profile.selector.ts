import { createFeatureSelector, createSelector, props } from "@ngrx/store";
import { profileState } from "./profile.state";

const getPostState = createFeatureSelector<profileState>('profile')


