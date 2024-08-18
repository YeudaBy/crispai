import {Step} from "@/src/model/Step";
import {Tag} from "./Tag";
import {Ingredient} from "@/src/model/Ingredient";
import {Category} from "@/src/model/Category";
import {Equipment} from "@/src/model/Equipment";
import {RecipeComment} from "@/src/model/RecipeComment";
import {AuthorPreview} from "./Author";
import {Generated} from "kysely";

export type Recipe = {
    id: number;
    title: string;
    description?: string;
    likes: number;
    /* is number for serialization */
    date: number;
    author: AuthorPreview;
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
    author: AuthorPreview;
}

export interface RecipeTable {
    id: Generated<number>
    title: string
    description?: string
    image?: string;
    date: Date
    author: number
    avgEstimate?: number
}
