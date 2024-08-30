import {Step} from "@/src/model/Step";
import {Tag} from "./Tag";
import {Ingredient} from "@/src/model/Ingredient";
import {Category} from "@/src/model/Category";
import {Equipment} from "@/src/model/Equipment";
import {RecipeComment} from "@/src/model/RecipeComment";
import {Generated} from "kysely";
import {Author} from "@/src/model/Author";
import {AccountPreview} from "@/src/model/Account";

export type Recipe = {
    id: number;
    title: string;
    description?: string;
    likes: number;
    /* is number for serialization */
    date: number;
    account: AccountPreview;
    image?: string;
    comments: RecipeComment[];
    ingredients: Ingredient[];
    steps: Step[];
    images: string[];
    categories: Category[];
    tags: Tag[];
    equipment: Equipment[];
}

export type RecipePreview = {
    id: number;
    title: string;
    description?: string;
    image?: string;
    /* is number for serialization */
    date: number;
    likes: number;
    account: AccountPreview;
}

export interface RecipeTable {
    id: Generated<number>
    title: string
    description?: string
    image?: string;
    date: Date
    account: number
    avgEstimate?: number
}
