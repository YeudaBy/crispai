import {Generated} from "kysely";

export type Comment = {
    id: string;
    content: string;
    date: Date;
    userId: string;
    recipeId: string;
    likes: number;
    authorReply?: string;
    authorLike: boolean;
    pined: boolean;
}

export interface CommentTable {
    id: Generated<string>
    content: string
    date: Date
    userId: string
    recipeId: string
    likes: number
    authorReply: string | null
    authorLike: boolean
    pined: boolean
}
