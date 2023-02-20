import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { deletePost } from "../posts/state/post.actions";
import { post } from "../posts/state/post.state";

const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class PostService {
    constructor(private http: HttpClient){

    }

    getPosts():Observable<post[]>{
        return this.http.get<post[]>(
            AUTH_API+'post'
        )
    }

    addPost(post: post):Observable<post>{
        console.log(post);
        
        return this.http.post<post>(
            AUTH_API+'post',
            post,
            httpOptions
        )
    }

    updatePost(post:post):Observable<post>{
        return this.http.patch<post>(
            AUTH_API+`post/${post._id}`,
            post,
            httpOptions
        )
    }

    deletePost(id: string){
        return this.http.delete(
            AUTH_API+`post/${id}`
        )
    }
}