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
    username: string,
    password: string
}

export interface AuthContextType {
    config: Config,
    user: string,
    authTokens: AuthTokens,
    loginUser: (e: Credentials) => void,
    logoutUser: () => void,
}

export interface AuthProviderType {
    children: ReactNode;
}