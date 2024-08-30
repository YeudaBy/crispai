import {Generated} from "kysely";
import {AccountPreview} from "@/src/model/Account";

export type RecipeComment = {
    id: number;
    content: string;
    /* number for serialization */
    date: number;
    account: AccountPreview,
    likes: number;
    author_reply?: string;
    author_like: boolean;
    pined: boolean;
}

export interface CommentTable {
    id: Generated<number>
    content: string
    date: Generated<Date>
    account: number
    recipe: number
    likes: Generated<number>
    author_reply?: string
    author_like: Generated<boolean>
    pined: Generated<boolean>
}
