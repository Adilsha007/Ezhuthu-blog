import { AuthState } from '../auth/state/auth.state';
import { authReducer } from '../auth/state/auth.reducer';
import { SharedState } from './shared/shared.state';
import { auth_state_name } from '../auth/state/auth.select';
import { shared_state_name } from './shared/shared.selector';
import { sharedReducer } from './shared/shared.reducer';
import { postState } from '../posts/state/post.state';
import { postReducer } from '../posts/state/post.reducer';



export interface AppState {
    [auth_state_name] : AuthState 
    [shared_state_name]: SharedState
    ['posts']: postState
}

export const AppReducer = {
    [auth_state_name] : authReducer,
    [shared_state_name]: sharedReducer,
    ['posts']: postReducer
}