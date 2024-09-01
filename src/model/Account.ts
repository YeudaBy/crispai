import {Generated} from "kysely";

export interface Account {
    id: string
    password?: string
    name: string
    email: string
    image?: string
}

export interface AccountPreview {
    id: string
    name: string
    image?: string
}

export interface AccountTable {
    id: Generated<string>
    password?: string
    name: string
    email: string
    image?: string
}
