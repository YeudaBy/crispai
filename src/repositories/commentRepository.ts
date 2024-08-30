import {db} from "../other/db/db";
import {RecipeComment} from "../model/RecipeComment";

export interface ICommentRepository {
    getCommentsByRecipe(
        recipeId: number,
        from?: number,
        limit?: number,
        orderBy?: 'date' | 'likes',
    ): Promise<RecipeComment[]>;

    createComment(
        recipeId: number,
        userId: number,
        content: string,
    ): void;

    deleteComment(id: number): void;

    pinComment(id: number): void;

    likeAsAuthor(id: number, content: string): void;

    increaseLikes(id: number): void;
}

class CommentRepository implements ICommentRepository {

    async getCommentsByRecipe(
        recipeId: number,
        from = 0,
        limit = 10,
        orderBy: 'date' | 'likes' = 'date'
    ): Promise<RecipeComment[]> {
        const result = await db
            .selectFrom('comment')
            .where('recipe', "=", recipeId)
            .innerJoin('account', 'comment.account', 'account.id')
            .select([
                // comment
                'comment.id',
                'content',
                'date',
                'account',
                'likes',
                'author_reply',
                'author_like',
                'pined',

                // account
                'account.id as account_id',
                'account.name as account_name',
                'account.image as account_image',
            ])
            .orderBy(orderBy, 'desc')
            .limit(limit)
            .offset(from)
            .execute()

        return result.map((comment) => ({
            id: comment.id,
            content: comment.content,
            date: comment.date.getDate(),
            account: {
                id: comment.account_id,
                name: comment.account_name,
                image: comment.account_image,
            },
            likes: comment.likes,
            author_reply: comment.author_reply,
            author_like: comment.author_like,
            pined: comment.pined,
        }))
    }

    createComment(
        recipeId: number,
        userId: number,
        content: string
    ): void {
        db.insertInto('comment')
            .values({
                recipe: recipeId,
                account: userId,
                content,
            })
            .execute();
    }

    deleteComment(id: number): void {
        db.deleteFrom('comment')
            .where('id', '=', id)
            .execute();
    }

    pinComment(id: number): void {
        db.updateTable('comment')
            .set({
                pined: true,
            })
            .where('id', '=', id)
            .execute();
    }

    likeAsAuthor(id: number, content: string): void {
        db.updateTable('comment')
            .set({
                author_reply: content,
            })
            .where('id', '=', id)
            .execute();
    }

    increaseLikes(id: number): void {
        db.updateTable('comment')
            .set((eb) => ({
                likes: eb('likes', "+", 1),
            }))
            .where('id', '=', id)
            .execute();
    }
}

export const commentRepository = new CommentRepository();
