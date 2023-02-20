export class User {
    constructor(
        private id: string,
        private email: string,
        private username: string,
        private role : string,
        private token: string,
        private fullname: string | null,
        private phoneno: number | null,
        private gender: string | null
    ){}

    get userToken(){
        return this.token
    }

    get userId(){
        return this.id
    }

    get userName(){
        return this.fullname
    }


}