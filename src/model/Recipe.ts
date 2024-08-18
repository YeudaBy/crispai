import {Step} from "@/src/model/Step";
import {Tag} from "./Tag";
import {Ingredient} from "@/src/model/Ingredient";
import {Category} from "@/src/model/Category";
import {Equipment} from "@/src/model/Equipment";
import {User, UserPreview} from "./User";
import {Generated} from "kysely";

export type Recipe = {
    id: number;
    title: string;
    description?: string;
    likes: number;
    date: number;
    user: User;
    comments: Comment[];
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
    date: number;
    user: UserPreview;
}

export interface RecipeTable {
    id: Generated<number>
    title: string
    description?: string
    date: Date
    author: number
    avgEstimate?: number
}
