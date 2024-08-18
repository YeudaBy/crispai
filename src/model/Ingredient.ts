import {Generated} from "kysely";

export type Ingredient = {
    id: string;
    name: string;
    amount: string;
    unit: string;
    required: boolean;
}

export interface IngredientTable {
    recipe_id: number
    id: Generated<string>
    name: string
    amount: string
    unit: string
    required: boolean
}
