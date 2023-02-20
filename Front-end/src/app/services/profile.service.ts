import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthResData } from "../models/auth-res-data";
import { User } from "../models/user-model";

const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
};

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    constructor(private http: HttpClient){

    }

    updateProfile(user:any):Observable<AuthResData>{
       
        console.log(user); 
         
        
        return this.http.post<AuthResData>(
            AUTH_API+'update-user',
                user
            ,
            { ...httpOptions, headers: undefined }
        )
    }
    }

