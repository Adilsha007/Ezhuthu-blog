import { createFeatureSelector, createSelector, props } from "@ngrx/store";
import { post, postState } from "./post.state";

const getPostState = createFeatureSelector<postState>('posts')

export const getPosts = createSelector(getPostState, (state)=>{
    return state.posts
} )

export const getPostById = createSelector(getPostState, (state: { posts: any[] },props: { id: any })=>{
    return state.posts.find((post)=> post._id === props.id)
})

