import {Generated} from "kysely";

export type Ingredient = {
    id: number;
    name: string;
    amount: string;
    unit: string;
    required: boolean;
}

export interface IngredientTable {
    recipe_id: number
    id: Generated<number>
    name: string
    amount: string
    unit: string
    required: boolean
}
