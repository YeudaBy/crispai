import {Generated} from "kysely";

export type Category = {
    id: string;
    name: string;
    image?: string;
}

export interface CategoryTable {
    id: Generated<string>
    name: string
    image: string
}
