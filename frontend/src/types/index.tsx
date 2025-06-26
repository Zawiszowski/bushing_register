import { type ReactNode } from "react"
import type { IconType } from "react-icons"

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

export interface SocialLinkData {
  href: string;
  icon: IconType;
  label: string;
}

export interface ProductLink {
  href: string;
  text: string;
}

export interface UsefulLink {
  href: string;
  text: string;
}

export interface ClientType {
    id: number, 
    name: string,
}

export interface ProjectType {
    id: number,
    name: string,
    client: number,
}


export interface RegisterType {
    id: number,
    custom_pn: string,
    client_pn: string
    decommissioned: boolean,
    storage_locker: string,
    velocity: string,
    axle: string,
    stiffness_x:  Array<number>,
    stiffness_y: Array<number>,//[1200,1000,850,800,820,850,800,780,800,850,1100],
    post_date: string,
    photo_links: Array<{file: string}>,
    project: ProjectType, //{id: null, name: null, client: null},,
    project_id: number,
    created_at: string,
    updated_at: string,
}

export interface ValidateRegister {
    client: boolean,
    project_id: boolean,
    axle: boolean,
    custom_pn: boolean,
    client_pn: boolean,
    storage_locker: boolean,
    photos: boolean,
    custom_pn_msg: string,
    photos_msg: string
}