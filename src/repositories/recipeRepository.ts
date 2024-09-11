import {Recipe, RecipePreview} from "@/src/model/Recipe";
import {db} from "../other/db/db";
import {userRepository} from "@/src/repositories/accountRepository";
import {Ingredient} from "@/src/model/Ingredient";
import {kv} from "@vercel/kv";
import {Tag} from "../model/Tag";
import {Category} from "../model/Category";
import {RecipeComment} from "../model/RecipeComment";
import {AccountPreview} from "@/src/model/Account";

export interface IRecipeRepository {
    getRecipe(id: string): Promise<Recipe | undefined>;

    getRecipePreview(id: string): Promise<RecipePreview | undefined>;

    getRecipesByLikes(): Promise<RecipePreview[]>;

    getRecipesByDate(): Promise<RecipePreview[]>;

    getRecipesByUser(userId: string): Promise<RecipePreview[]>;

    getRecipesByCategory(category: string): Promise<RecipePreview[]>;

    getRecipesBySearch(search: string): Promise<RecipePreview[]>;

    createRecipe(
        title: string,
        userId: string,
        description?: string,
        image?: string
    ): Promise<string>;

    updateTitle(id: string, title: string): Promise<void>;

    updateDescription(id: string, description: string): Promise<void>;

    updateImage(id: string, image: string): Promise<void>;

    deleteRecipe(id: string): void;

    likeRecipe(id: string, userId: string): void;

    unlikeRecipe(id: string, userId: string): void;

    getLikedRecipes(userId: string): Promise<RecipePreview[]>;

    getUsersWhoLiked(id: string): Promise<AccountPreview[]>;

    getTags(): Promise<Tag[]>;

    getCategories(): Promise<Category[]>;
}

class RecipeRepository implements IRecipeRepository {
    async getRecipe(id: string): Promise<Recipe | undefined> {
        const cd = await kv.get<Recipe>(`recipe_${id}`);
        if (cd) return cd

        const recipe = await db
            .selectFrom('recipe')
            .leftJoin('recipe_like', 'recipe.id', 'recipe_like.recipe')
            .innerJoin('account', 'recipe.account', 'account.id')
            .select(({fn}) => [
                // recipe
                'recipe.id as recipe_id',
                'recipe.title',
                'recipe.description',
                'recipe.date',
                'recipe.account',
                'recipe.main_image',

                // account
                'account.id as user_id',
                'account.name',
                'account.image as user_image',

                fn.count('recipe_like.account').as('likes_count')
            ])
            .where('recipe.id', '=', id)
            .groupBy(['recipe.id', 'account.id'])
            .executeTakeFirst();


        if (!recipe) {
            return undefined
        }

        const ingredients: Ingredient[] = [] // await this.getRecipeIngredients(id);
        const comments: RecipeComment[] = [] //await commentRepository.getCommentsByRecipe(id);

        const data: Recipe = {
            id: recipe.recipe_id,
            title: recipe.title,
            description: recipe.description,
            likes: Number(recipe.likes_count),
            main_image: recipe.main_image,
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

    async getRecipePreview(id: string): Promise<RecipePreview | undefined> {
        const cd = await kv.get<RecipePreview>(`recipe_preview_${id}`);
        if (cd) return cd

        const recipe = await db
            .selectFrom('recipe')
            .leftJoin('recipe_like', 'recipe.id', 'recipe_like.recipe')
            .innerJoin('account', 'recipe.account', 'account.id')
            .select(({fn}) => [
                // recipe
                'recipe.id',
                'recipe.title',
                'recipe.description',
                'recipe.date',
                'recipe.account',
                'recipe.main_image',

                // author
                'account.id as user_id',
                'account.name as user_name',
                'account.image as user_image',

                fn.count('recipe_like.account').as('likes_count')
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
            image: recipe.main_image,
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
            .leftJoin('recipe_like', 'recipe.id', 'recipe_like.recipe')
            .select(({fn, val}) => [
                'id',
                fn.count('recipe_like.account').as('likes_count')
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

    async getRecipesByUser(userId: string): Promise<Recipe[]> {
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

    async getRecipesByCategory(category: string): Promise<Recipe[]> {
        // todo implement
        return []
    }

    async getRecipesBySearch(search: string): Promise<Recipe[]> {
        const cd = await kv.get<Recipe[]>(`recipes_by_search_${search}`);
        if (cd) return cd

        const ids = await db
            .selectFrom('recipe')
            .select(['id'])
            .where('title', 'like', `%${search}%`)
            .execute();

        const recipes = await Promise.all(ids.map(async (recipe) => {
            return this.getRecipePreview(recipe.id);
        }));

        const filtered = recipes.filter((recipe): recipe is Recipe => recipe !== undefined)

        await kv.set(`recipes_by_search_${search}`, filtered, {ex: 60 * 60 * 24})

        return filtered
    }

    async createRecipe(
        title: string,
        userId: string,
        description?: string,
        image?: string
    ): Promise<string> {
        const newRecipe = await db
            .insertInto('recipe')
            .values({
                title,
                description,
                account: userId,
                date: new Date(),
                main_image: image,
            })
            .returning('id')
            .executeTakeFirst();

        if (!newRecipe) {
            throw new Error('Recipe not created')
        }

        await kv.del(`recipes_by_user_${userId}`)
        await kv.del('recipes_by_likes')
        await kv.del('recipes_by_date')

        return newRecipe.id;
    }

    async updateTitle(id: string, title: string): Promise<void> {
        await db
            .updateTable('recipe')
            .set({
                title
            })
            .where('id', '=', id)
            .execute();
        await kv.del(`recipe_${id}`)
        await kv.del(`recipe_preview_${id}`)
    }

    async updateDescription(id: string, description: string): Promise<void> {
        await db
            .updateTable('recipe')
            .set({description})
            .where('id', '=', id)
            .execute();
        await kv.del(`recipe_${id}`)
        await kv.del(`recipe_preview_${id}`)
    }

    async updateImage(id: string, image: string): Promise<void> {
        await db
            .updateTable('recipe')
            .set({main_image: image})
            .where('id', '=', id)
            .execute();
        await kv.del(`recipe_${id}`)
        await kv.del(`recipe_preview_${id}`)
    }

    async deleteRecipe(id: string) {
        await db
            .deleteFrom('recipe')
            .where('id', '=', id)
            .execute();
        await kv.del(`recipe_${id}`)
    }

    async likeRecipe(id: string, userId: string) {
        await db
            .insertInto('recipe_like')
            .values({
                recipe: id,
                account: userId,
            })
            .execute();
        await kv.del(`liked_recipes_${userId}`)
    }

    async unlikeRecipe(id: string, userId: string) {
        await db
            .deleteFrom('recipe_like')
            .where('recipe', '=', id)
            .where('account', '=', userId)
            .execute();
        await kv.del(`liked_recipes_${userId}`)
    }

    async getLikedRecipes(userId: string): Promise<Recipe[]> {
        const cd = await kv.get<Recipe[]>(`liked_recipes_${userId}`);
        if (cd) return cd

        const ids = await db
            .selectFrom('recipe_like')
            .select(['recipe'])
            .where('account', '=', userId)
            .execute();

        const recipes = await Promise.all(ids.map(async (recipe) => {
            return this.getRecipe(recipe.recipe);
        }));

        const filtered = recipes.filter((recipe): recipe is Recipe => recipe !== undefined)

        await kv.set(`liked_recipes_${userId}`, filtered, {ex: 60 * 60 * 24})
        return filtered
    }

    async getUsersWhoLiked(id: string): Promise<AccountPreview[]> {
        const ids = await db
            .selectFrom('recipe_like')
            .select(['account'])
            .where('recipe', '=', id)
            .execute();

        const users = await Promise.all(ids.map(async (user) => {
            return userRepository.getAccountPreview(user.account);
        }));

        return users.filter((user): user is AccountPreview => user !== undefined)
    }

    private async getRecipeIngredients(id: string): Promise<Ingredient[]> {
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

    async getCategories(): Promise<Category[]> {
        const cd = await kv.get<Category[]>('categories');
        if (cd) return cd

        const categories = await db
            .selectFrom('category')
            .select(['id', 'name', 'image'])
            .execute();

        await kv.set('categories', categories, {ex: 60 * 60 * 24})
        return categories
    }
}

export const recipeRepository: IRecipeRepository = new RecipeRepository();
