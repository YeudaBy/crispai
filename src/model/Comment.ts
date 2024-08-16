export type Comment = {
    id: string;
    content: string;
    date: string;
    userId: string;
    recipeId: string;
    likes: number;
    authorReply?: string;
    authorLike: boolean;
    pined: boolean;
}
