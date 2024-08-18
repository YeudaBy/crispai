import {Generated} from "kysely";

export type Category = {
    id: number;
    name: string;
    image?: string;
}

export interface CategoryTable {
    id: Generated<number>
    name: string
    image: string
}
