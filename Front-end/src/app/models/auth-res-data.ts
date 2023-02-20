export interface AuthResData {
    id: string,
    email: string,
    username: string,
    role: string,
    token:string,
    fullname: string | null,
    phoneno: number | null,
    gender: string | null
}