import {db} from "../other/db";
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
            .where('recipe_id', "=", recipeId)
            .innerJoin('account', 'comment.author_id', 'account.id')
            .select([
                // comment
                'comment.id',
                'content',
                'date',
                'author_id',
                'likes',
                'author_reply',
                'author_like',
                'pined',

                // account
                'account.id',
                'account.name',
                'account.image',
                'account.verified'
            ])
            .orderBy(orderBy, 'desc')
            .limit(limit)
            .offset(from)
            .execute()

        return result.map((comment) => ({
            id: comment.id,
            content: comment.content,
            date: comment.date.getDate(),
            user: {
                id: comment.author_id,
                name: comment.name,
                image: comment.image,
                verified: comment.verified,
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
                recipe_id: recipeId,
                author_id: userId,
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
            .set('pined', true)
            .where('id', '=', id)
            .execute();
    }

    likeAsAuthor(id: number, content: string): void {
        db.updateTable('comment')
            .set('author_reply', content)
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
