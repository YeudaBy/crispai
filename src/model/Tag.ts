import {Generated} from "kysely";

export type Tag = {
    id: number;
    name: string;
    image: string;
}

export interface TagTable {
    id: Generated<number>
    name: string
    image: string
}
