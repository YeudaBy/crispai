import {Generated} from "kysely";

export type Equipment = {
    id: number;
    name: string;
    image?: string;
}

export interface EquipmentTable {
    id: Generated<number>
    name: string
    image: string
}
