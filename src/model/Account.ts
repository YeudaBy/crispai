import {Generated} from "kysely";

export interface Account {
    id: number
    password?: string
    name: string
    email: string
    image?: string
}

export interface AccountPreview {
    id: number
    name: string
    image?: string
}

export interface AccountTable {
    id: Generated<number>
    password?: string
    name: string
    email: string
    image?: string
}
