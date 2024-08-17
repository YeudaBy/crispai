import {Generated} from "kysely";

export type Equipment = {
    id: string;
    name: string;
    image?: string;
}

export interface EquipmentTable {
    id: Generated<string>
    name: string
    image: string
}
