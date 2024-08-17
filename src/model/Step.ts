import {Generated} from "kysely";

export type Step = {
    id: string;
    description: string;
    image: string;
    order: number;
}

export interface StepTable {
    id: Generated<string>
    description: string
    image: string
    order: number
}
