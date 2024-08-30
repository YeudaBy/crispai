import {Recipe, RecipePreview} from "@/src/model/Recipe";
import {db} from "../other/db/db";
import {userRepository} from "@/src/repositories/accountRepository";
import {Ingredient} from "@/src/model/Ingredient";
import {commentRepository} from "@/src/repositories/commentRepository";
import {kv} from "@vercel/kv";
import {Tag} from "../model/Tag";
import {AccountPreview} from "@/src/model/Account";

export interface IRecipeRepository {
    getRecipe(id: number): Promise<Recipe | undefined>;

    getRecipePreview(id: number): Promise<RecipePreview | undefined>;

    getRecipesByLikes(): Promise<RecipePreview[]>;

    getRecipesByDate(): Promise<RecipePreview[]>;

    getRecipesByUser(userId: number): Promise<RecipePreview[]>;

    getRecipesByCategory(category: number): Promise<RecipePreview[]>;

    getRecipesBySearch(search: string): Promise<RecipePreview[]>;

    createRecipe(
        title: string,
        description: string,
        userId: number,
        image?: string
    ): Promise<number>;

    updateTitle(id: number, title: string): Promise<void>;

    updateDescription(id: number, description: string): Promise<void>;

    updateImage(id: number, image: string): Promise<void>;

    deleteRecipe(id: number): void;

    likeRecipe(id: number, userId: number): void;

    unlikeRecipe(id: number, userId: number): void;

    getLikedRecipes(userId: number): Promise<RecipePreview[]>;

    getUsersWhoLiked(id: number): Promise<AccountPreview[]>;

    getTags(): Promise<Tag[]>;
}

class RecipeRepository implements IRecipeRepository {
    async getRecipe(id: number): Promise<Recipe | undefined> {
        const cd = await kv.get<Recipe>(`recipe_${id}`);
        if (cd) return cd

        const recipe = await db
            .selectFrom('recipe')
            .leftJoin('recipe_like', 'recipe.id', 'recipe_like.recipe_id')
            .innerJoin('account', 'recipe.account', 'account.id')
            .select(({fn}) => [
                // recipe
                'recipe.id as recipe_id',
                'recipe.title',
                'recipe.description',
                'recipe.date',
                'recipe.account',
                'recipe.image',

                // account
                'account.id as user_id',
                'account.name',
                'account.image as user_image',

                fn.count('recipe_like.user_id').as('likes_count')
            ])
            .where('recipe.id', '=', id)
            .groupBy(['recipe.id', 'account.id'])
            .executeTakeFirst();


        if (!recipe) {
            return undefined
        }

        const ingredients = await this.getRecipeIngredients(id);
        const comments = await commentRepository.getCommentsByRecipe(id);

        const data: Recipe = {
            id: recipe.recipe_id,
            title: recipe.title,
            description: recipe.description,
            likes: Number(recipe.likes_count),
            image: recipe.image,
            date: recipe.date.getDate(),
            account: {
                id: recipe.user_id,
                name: recipe.name,
                image: recipe.user_image,
            },
            comments,
            ingredients,
            steps: [],
            images: [],
            categories: [],
            tags: [],
            equipment: [],
        }

        await kv.set(`recipe_${id}`, data, {ex: 60 * 60 * 24})
        return data
    }

    async getRecipePreview(id: number): Promise<RecipePreview | undefined> {
        const cd = await kv.get<RecipePreview>(`recipe_preview_${id}`);
        if (cd) return cd

        const recipe = await db
            .selectFrom('recipe')
            .leftJoin('recipe_like', 'recipe.id', 'recipe_like.recipe_id')
            .innerJoin('account', 'recipe.account', 'account.id')
            .select(({fn}) => [
                // recipe
                'recipe.id',
                'recipe.title',
                'recipe.description',
                'recipe.date',
                'recipe.account',
                'recipe.image',

                // author
                'account.id as user_id',
                'account.name as user_name',
                'account.image as user_image',

                fn.count('recipe_like.user_id').as('likes_count')
            ])
            .groupBy(['recipe.id', 'account.id'])
            .where('recipe.id', '=', id)
            .executeTakeFirst();

        if (!recipe) {
            return undefined
        }

        const date: RecipePreview = {
            id: recipe.id,
            title: recipe.title,
            description: recipe.description,
            image: recipe.image,
            date: recipe.date.getDate(),
            account: {
                id: recipe.user_id,
                name: recipe.user_name,
                image: recipe.user_image,
            },
            likes: Number(recipe.likes_count),
        }

        await kv.set(`recipe_preview_${id}`, date, {ex: 60 * 60 * 24})
        return date
    }

    async getRecipesByLikes(): Promise<RecipePreview[]> {
        const cd = await kv.get<RecipePreview[]>('recipes_by_likes');
        if (cd) return cd

        const ids = await db
            .selectFrom('recipe')
            .leftJoin('recipe_like', 'recipe.id', 'recipe_like.recipe_id')
            .select(({fn, val}) => [
                'id',
                fn.count('recipe_like.user_id').as('likes_count')
            ])
            .groupBy('recipe.id')
            .orderBy('likes_count', 'desc')
            .execute();

        const recipes = await Promise.all(ids.map(async (recipe) => {
            return this.getRecipePreview(recipe.id);
        }));

        const valid = recipes.filter((recipe): recipe is Recipe => recipe !== undefined);
        await kv.set('recipes_by_likes', valid, {ex: 60 * 60 * 24})
        return valid
    }


    async getRecipesByDate(): Promise<RecipePreview[]> {
        const cd = await kv.get<RecipePreview[]>('recipes_by_date');
        if (cd) return cd

        const ids = await db
            .selectFrom('recipe')
            .select(['id', 'date'])
            .orderBy('date', 'desc')
            .execute();

        const recipes = await Promise.all(ids.map(async (recipe) => {
            return this.getRecipePreview(recipe.id);
        }));

        const valid = recipes.filter((recipe): recipe is Recipe => recipe !== undefined)
        await kv.set('recipes_by_date', valid, {ex: 60 * 60 * 24})
        return valid
    }

    async getRecipesByUser(userId: number): Promise<Recipe[]> {
        const cd = await kv.get<Recipe[]>(`recipes_by_user_${userId}`);
        if (cd) return cd

        const ids = await db
            .selectFrom('recipe')
            .select(['id'])
            .where('account', '=', userId)
            .execute();

        const recipes = await Promise.all(ids.map(async (recipe) => {
            return this.getRecipePreview(recipe.id);
        }));

        const valid = recipes.filter((recipe): recipe is Recipe => recipe !== undefined)
        await kv.set(`recipes_by_user_${userId}`, valid, {ex: 60 * 60 * 24})
        return valid
    }

    async getRecipesByCategory(category: number): Promise<Recipe[]> {
        // todo implement
        return []
    }

    async getRecipesBySearch(search: string): Promise<Recipe[]> {
        const ids = await db
            .selectFrom('recipe')
            .select(['id'])
            .where('title', 'like', `%${search}%`)
            .execute();

        const recipes = await Promise.all(ids.map(async (recipe) => {
            return this.getRecipePreview(recipe.id);
        }));

        return recipes.filter((recipe): recipe is Recipe => recipe !== undefined)
    }

    async createRecipe(
        title: string,
        description: string,
        userId: number,
        image?: string
    ): Promise<number> {
        const newRecipe = await db
            .insertInto('recipe')
            .values({
                title,
                description,
                account: userId,
                date: new Date(),
                image,
            })
            .returning('id')
            .executeTakeFirst();

        if (!newRecipe) {
            throw new Error('Recipe not created')
        }

        return newRecipe.id;
    }

    async updateTitle(id: number, title: string): Promise<void> {
        await db
            .updateTable('recipe')
            .set({
                title
            })
            .where('id', '=', id)
            .execute();
        await kv.del(`recipe_${id}`)
    }

    async updateDescription(id: number, description: string): Promise<void> {
        await db
            .updateTable('recipe')
            .set({description})
            .where('id', '=', id)
            .execute();
    }

    async updateImage(id: number, image: string): Promise<void> {
        await db
            .updateTable('recipe')
            .set({image})
            .where('id', '=', id)
            .execute();
        await kv.del(`recipe_${id}`)
    }

    async deleteRecipe(id: number) {
        await db
            .deleteFrom('recipe')
            .where('id', '=', id)
            .execute();
        await kv.del(`recipe_${id}`)
    }

    async likeRecipe(id: number, userId: number) {
        await db
            .insertInto('recipe_like')
            .values({
                recipe_id: id,
                user_id: userId,
            })
            .execute();
        await kv.del(`recipe_${id}`)
    }

    unlikeRecipe(id: number, userId: number) {
        db
            .deleteFrom('recipe_like')
            .where('recipe_id', '=', id)
            .where('user_id', '=', userId)
            .execute();
    }

    async getLikedRecipes(userId: number): Promise<Recipe[]> {
        const ids = await db
            .selectFrom('recipe_like')
            .select(['recipe_id'])
            .where('user_id', '=', userId)
            .execute();

        const recipes = await Promise.all(ids.map(async (recipe) => {
            return this.getRecipe(recipe.recipe_id);
        }));

        return recipes.filter((recipe): recipe is Recipe => recipe !== undefined)
    }

    async getUsersWhoLiked(id: number): Promise<AccountPreview[]> {
        const ids = await db
            .selectFrom('recipe_like')
            .select(['user_id'])
            .where('recipe_id', '=', id)
            .execute();

        const users = await Promise.all(ids.map(async (user) => {
            return userRepository.getAccountPreview(user.user_id);
        }));

        return users.filter((user): user is AccountPreview => user !== undefined)
    }

    private async getRecipeIngredients(id: number): Promise<Ingredient[]> {
        return db
            .selectFrom('ingredient')
            .select(['id', 'name', 'amount', 'unit', "required"])
            .where('recipe_id', '=', id)
            .execute();
    }

    async getTags(): Promise<Tag[]> {
        const cd = await kv.get<Tag[]>('tags');
        if (cd) return cd

        const tags = await db
            .selectFrom('tag')
            .select(['id', 'name', 'image'])
            .execute();

        await kv.set('tags', tags, {ex: 60 * 60 * 24})
        return tags
    }
}

export const recipeRepository: IRecipeRepository = new RecipeRepository();
