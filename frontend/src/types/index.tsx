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
    name: string,
    // surname: string, ???????????????
    email: string,
    password: string,
    password2: string,

}

export interface AuthContextType {
    config: Config,
    user: string,
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