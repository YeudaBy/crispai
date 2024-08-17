import {Generated} from "kysely";

export type User = {
    id: number;
    email: string;
    name: string;
    image?: string;
    bio?: string;
    verified: boolean;
}

export type UserPreview = {
    id: number;
    name: string;
    image?: string;
    verified: boolean;
}

export interface AccountTable {
    id: Generated<number>
    password?: string
    name: string
    email: string
    image?: string
    bio?: string
    verified: boolean
}
