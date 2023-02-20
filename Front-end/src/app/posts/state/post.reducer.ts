import { createReducer, on } from "@ngrx/store";
import { addPostSuccess, deletePostSuccess, loadPostsSuccess, updatePostSuccess } from "./post.actions";
import { initialState } from "./post.state";

export const postReducer = createReducer(
    initialState,
    on(addPostSuccess,(state, action)=>{

        let post = {...action.post}

        return {
            ...state,
            posts: [...state.posts, post]
        }
    }),
    on(loadPostsSuccess,(state, action)=>{
        console.log(action.posts);
        
        return {
            ...state,
            posts: action.posts
        }
    }),
    on(updatePostSuccess,(state,action)=>{
        const updatedPosts = state.posts.map((post)=>{
            return action.post._id === post._id ? action.post : post
        })
        
        return {
            ...state,
            posts: updatedPosts
        }
    }),
    on(deletePostSuccess,(state, action)=>{
        const updatedPosts = state.posts.filter((post)=>{
            return post._id !== action.id
        })

        return {
            ...state,
            posts: updatedPosts
        }
    })
)