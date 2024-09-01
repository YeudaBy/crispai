import {Author} from "@/src/model/Author";
import {db} from "@/src/other/db/db";

export interface IAuthorRepository {
    getAuthor(id: string): Promise<Author | undefined>;
}

class AuthorRepository implements IAuthorRepository {

    async getAuthor(id: string): Promise<Author | undefined> {
        const result = await db
            .selectFrom('author')
            .innerJoin('account', 'author.account', 'account.id')
            .where('author.account', '=', id)
            .select([
                // account
                'account.id as account_id',
                'account.name as account_name',
                'account.image as account_image',

                // author
                'bio',
                'verified',
            ])
            .executeTakeFirst()

        if (!result) return undefined;

        const data: Author = {
            account: {
                id: result.account_id,
                name: result.account_name,
                image: result.account_image,
            },
            bio: result.bio,
            verified: result.verified,
        }

        return data;
    }
}

export const authorRepository = new AuthorRepository();
