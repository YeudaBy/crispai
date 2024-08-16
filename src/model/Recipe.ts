import {Step} from "@/src/model/Step";
import { Tag } from "./Tag";
import {Ingredient} from "@/src/model/Ingredient";
import {Category} from "@/src/model/Category";
import {Equipment} from "@/src/model/Equipment";

export type Recipe = {
    id: string;
    title: string;
    description: string;
    likes: number;
    date: string;
    userId: string;
    comments: Comment[];
    ingredients: Ingredient[];
    steps: Step[];
    images: string[];
    categories: Category[];
    tags: Tag[];
    equipment: Equipment[];
}
