import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap } from "rxjs";
import { PostService } from "src/app/services/post.service";
import {  addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./post.actions";

@Injectable()

export class PostEffects {
    constructor(private actions$: Actions, private postService: PostService){}


    loadPosts$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(loadPosts),
            mergeMap((action)=>{
                return this.postService.getPosts().pipe(
                    map((posts)=>{
                        return loadPostsSuccess({posts})
                    })
                )
            })
        )
    })


    addPost$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(addPost),
            mergeMap((action)=>{
                console.log(action.post);
                
                return this.postService.addPost(action.post).pipe(
                    map((post)=>{
                        return addPostSuccess({post})
                    })
                )
            })
        )
    })


    updatePost$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(updatePost),
            switchMap((action)=>{
                return this.postService.updatePost(action.post).pipe(
                    map((post)=>{
                        return updatePostSuccess({post})
                    }) 
                )
            })
        )
    })


    deletePost$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(deletePost),
            switchMap((action)=>{
                return this.postService.deletePost(action.id).pipe(
                    map((data)=>{
                        return deletePostSuccess({id: action.id})
                    })
                )
            })
        )
    })

}