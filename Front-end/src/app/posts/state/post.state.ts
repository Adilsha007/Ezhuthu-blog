export interface post {
    _id? : string,
    title: string,
    subtitle: string,
    description: string
}

export interface postState {
    posts: post[]
}

export const initialState: postState = {
    posts : []
}