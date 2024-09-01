import {Generated} from "kysely";
import {AccountPreview} from "@/src/model/Account";

export type RecipeComment = {
    id: string;
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
    id: Generated<string>
    content: string
    date: Generated<Date>
    account: string
    recipe: string
    likes: Generated<number>
    author_reply?: string
    author_like: Generated<boolean>
    pined: Generated<boolean>
}
