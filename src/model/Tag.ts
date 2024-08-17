import {Generated} from "kysely";

export type Tag = {
    id: string;
    name: string;
    image: string;
}

export interface TagTable {
    id: Generated<string>
    name: string
    image: string
}
