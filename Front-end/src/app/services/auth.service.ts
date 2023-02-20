import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthResData } from "../models/auth-res-data";
import { User } from "../models/user-model";

const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private http: HttpClient){

    }

    signin(email: string, password: string): Observable<AuthResData>{
        
        return this.http.post<AuthResData>(
            AUTH_API+'signin',
            { 
                email,
                password
            },
            httpOptions
        )
    }

    formatUser(data: AuthResData){
        const user = new User(data.id,data.email,data.username,data.role,data.token,data.fullname,data.phoneno,data.gender)
        return user
    }


    signup(username:string, email: string, password: string): Observable<Object>{

        return this.http.post<Object>(
            AUTH_API+'signup',
            {
                username,
                email,
                password
            },
            httpOptions
        )
    }


    setUserInLocalStorage(user: User){

        localStorage.setItem('userData',JSON.stringify(user))

    }

    getUserFromLocalStorage(){
        
        const userDataString = localStorage.getItem('userData')

        if(userDataString){
            const userData = JSON.parse(userDataString)
            const user = new User(userData.id,userData.email,userData.username,userData.role,userData.token,userData.fullname,userData.phoneno,userData.gender)
            return user
        }

        return null
    }


    logout():Observable<Object>{
        localStorage.removeItem('userData')

        return this.http.get<Object>(
            AUTH_API + 'signout',
        )
    }

}