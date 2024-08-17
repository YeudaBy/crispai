import {Generated} from "kysely";

export type Ingredient = {
    id: string;
    name: string;
    amount: string;
    unit: string;
}

export interface IngredientTable {
    id: Generated<string>
    name: string
    amount: string
    unit: string
}
