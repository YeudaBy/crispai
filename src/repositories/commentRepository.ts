import {db} from "../other/db";
import {Comment} from "../model/Comment";

export interface ICommentRepository {
    getCommentsByRecipe(
        recipeId: string,
        from?: number,
        limit?: number,
        orderBy?: 'date' | 'likes',
    ): Promise<Comment[]>;

    createComment(
        recipeId: string,
        userId: string,
        content: string,
    ): void;

    deleteComment(id: string): void;

    pinComment(id: string): void;

    likeAsAuthor(id: string, content: string): void;
}

class CommentRepository implements ICommentRepository {
    async getCommentsByRecipe(
        recipeId: string,
        from: number = 0,
        limit: number = 20,
        orderBy: 'date' | 'likes' = 'likes'
    ): Promise<Comment[]> {
        const comments = await db
            .selectFrom('comment')
            .select([
                'id', 'userId', 'content', 'date', 'recipeId', 'likes', 'authorLike', 'pined'
            ])
            .where('recipeId', '=', recipeId)
            .orderBy('pined', 'desc')
            .orderBy(orderBy, 'desc')
            .limit(limit)
            .offset(from)
            .execute();

        return comments.map((comment) => {
            return {
                id: comment.id,
                userId: comment.userId,
                content: comment.content,
                date: comment.date,
                recipeId: comment.recipeId,
                likes: comment.likes,
                authorLike: comment.authorLike,
                pined: comment.pined,
            };
        });
    }

    createComment(
        recipeId: string,
        userId: string,
        content: string,
    ) {
        db
            .insertInto('comment')
            .values({
                userId,
                recipeId,
                content,
                pined: false,
                authorLike: false,
                likes: 0,
                date: new Date()
            })
            .returning('content')
            .execute();
    }

    deleteComment(id: string) {
        db
            .deleteFrom('comment')
            .where('id', '=', id)
            .execute();
    }

    pinComment(id: string) {
        db
            .updateTable('comment')
            .set('pined', true)
            .where('id', '=', id)
            .execute();
    }

    likeAsAuthor(id: string) {
        db
            .updateTable('comment')
            .set('authorLike', true)
            .where('id', '=', id)
            .execute();
    }
}

export const commentRepository = new CommentRepository();
