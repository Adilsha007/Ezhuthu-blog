export interface Profile {
    id: string    | null,
    email: string | null,
    username: string | null,
    role: string | null,
    token:string | null,
    fullname: string | null,
    phoneno: number | null,
    gender: string | null
}

export interface profileState {
    profile: Profile
}

export const initialValue: Profile = {
    id: null,
    email: null,
    username: null,
    role: null,
    token:null,
    fullname:  null,
    phoneno:  null,
    gender:  null
}