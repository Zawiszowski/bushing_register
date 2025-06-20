import { type ReactNode } from "react"

export interface AuthTokens {
    access: string,
    refresh: string
} 

export interface Config {
    headers: {
        Authorization: string
    }
}

export interface Credentials {
    email: string,
    password: string
}

export interface AuthError {
    error: string,
    detail: Array<string>,
}

export interface RegisterForm {
    first_name: string,
    last_name: string, 
    email: string,
    password: string,
    password2: string,

}
export interface UserType {

    token_type: string,
    exp: number,
    iat: number,
    jti: string,
    user_id: number,
    email: string,
    groups: Array<string>,
    permissions: Array<string>,

}

export interface AuthContextType {
    config: Config,
    user: UserType,
    authTokens: AuthTokens,
    loginUser: (e: Credentials) => void,
    logoutUser: () => void,
    registerUser: (e: RegisterForm) => void,
    setAuthError: (e: AuthError) => void,
    authError: AuthError,
    created: boolean,

}

export interface AuthProviderType {
    children: ReactNode;
}