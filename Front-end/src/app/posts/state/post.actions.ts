import { createAction, props } from "@ngrx/store";
import { post } from "./post.state";

export const addPost = createAction('[post page] add New post', props<{post: post}>())
export const addPostSuccess = createAction('[post page] add post success', props<{post: post}>())

export const loadPosts = createAction('[post page]  load posts')
export const loadPostsSuccess = createAction('[post page] load posts success',props<{posts: post[]}>())

export const updatePost = createAction('[post page] updating post',props<{post: post}>())
export const updatePostSuccess = createAction('[post page] update post success',props<{post: post}>())

export const deletePost = createAction('[post page] delete post',props<{id: string}>())
export const deletePostSuccess = createAction('[post page] delete post success',props<{id: string}>())
