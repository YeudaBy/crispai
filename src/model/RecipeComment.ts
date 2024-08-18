import {Generated} from "kysely";
import {AuthorPreview} from "@/src/model/Author";

export type RecipeComment = {
    id: number;
    content: string;
    date: number;
    user: AuthorPreview,
    likes: number;
    author_reply?: string;
    author_like: boolean;
    pined: boolean;
}

export interface CommentTable {
    id: Generated<number>
    content: string
    date: Generated<Date>
    author_id: number
    recipe_id: number
    likes: Generated<number>
    author_reply?: string
    author_like: Generated<boolean>
    pined: Generated<boolean>
}
