import {Recipe, RecipePreview} from "@/src/model/Recipe";
import {User} from "../model/User";
import {db} from "../other/db";
import {userRepository} from "@/src/repositories/userRepository";

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

    getUsersWhoLiked(id: number): Promise<User[]>;
}

class RecipeRepository implements IRecipeRepository {
    async getRecipe(id: number): Promise<Recipe | undefined> {
        const recipe = await db
            .selectFrom('recipe')
            .leftJoin('recipe_like', 'recipe.id', 'recipe_like.recipe_id')
            .select(({fn}) => [
                'recipe.id',
                'recipe.title',
                'recipe.description',
                'recipe.date',
                'recipe.author',
                'recipe.image',
                fn.count('recipe_like.user_id').as('likes_count')
            ])
            .where('recipe.id', '=', id)
            .groupBy('recipe.id')
            .executeTakeFirst();


        if (!recipe) {
            return undefined
        }

        const user = await userRepository.getUser(recipe.author)
        if (!user) {
            throw new Error('User not found')
        }

        return {
            id: recipe.id,
            title: recipe.title,
            description: recipe.description,
            likes: Number(recipe.likes_count),
            image: recipe.image,
            date: recipe.date.getDate(),
            user: user,
            comments: [],
            ingredients: [],
            steps: [],
            images: [],
            categories: [],
            tags: [],
            equipment: [],
        }
    }

    async getRecipePreview(id: number): Promise<RecipePreview | undefined> {
        const recipe = await db
            .selectFrom('recipe')
            .leftJoin('recipe_like', 'recipe.id', 'recipe_like.recipe_id')
            .select(({fn, val}) => [
                'recipe.id',
                'title',
                'description',
                'date',
                'author',
                'recipe.image',
                fn.count('recipe_like.user_id').as('likes_count')
            ])
            .groupBy('recipe.id')
            .where('recipe.id', '=', id)
            .executeTakeFirst();

        if (!recipe) {
            return undefined
        }

        const user = await userRepository.getUserPreview(recipe.author)
        if (!user) {
            throw new Error('User not found')
        }

        return {
            id: recipe.id,
            title: recipe.title,
            description: recipe.description,
            image: recipe.image,
            date: recipe.date.getDate(),
            user: user,
            likes: Number(recipe.likes_count),
        }
    }

    async getRecipesByLikes(): Promise<RecipePreview[]> {
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

        return recipes.filter((recipe): recipe is Recipe => recipe !== undefined);
    }


    async getRecipesByDate(): Promise<RecipePreview[]> {
        const ids = await db
            .selectFrom('recipe')
            .select(['id', 'date'])
            .orderBy('date', 'desc')
            .execute();

        const recipes = await Promise.all(ids.map(async (recipe) => {
            return this.getRecipePreview(recipe.id);
        }));

        return recipes.filter((recipe): recipe is Recipe => recipe !== undefined)

    }

    async getRecipesByUser(userId: number): Promise<Recipe[]> {
        const ids = await db
            .selectFrom('recipe')
            .select(['id'])
            .where('author', '=', userId)
            .execute();

        const recipes = await Promise.all(ids.map(async (recipe) => {
            return this.getRecipePreview(recipe.id);
        }));

        return recipes.filter((recipe): recipe is Recipe => recipe !== undefined)
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
                author: userId,
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
            .set('title', title)
            .where('id', '=', id)
            .execute();
    }

    async updateDescription(id: number, description: string): Promise<void> {
        await db
            .updateTable('recipe')
            .set('description', description)
            .where('id', '=', id)
            .execute();
    }

    async updateImage(id: number, image: string): Promise<void> {
        await db
            .updateTable('recipe')
            .set('image', image)
            .where('id', '=', id)
            .execute();
    }

    deleteRecipe(id: number) {
        db
            .deleteFrom('recipe')
            .where('id', '=', id)
            .execute();
    }

    likeRecipe(id: number, userId: number) {
        db
            .insertInto('recipe_like')
            .values({
                recipe_id: id,
                user_id: userId,
            })
            .execute();
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

    async getUsersWhoLiked(id: number): Promise<User[]> {
        const ids = await db
            .selectFrom('recipe_like')
            .select(['user_id'])
            .where('recipe_id', '=', id)
            .execute();

        const users = await Promise.all(ids.map(async (user) => {
            return userRepository.getUser(user.user_id);
        }));

        return users.filter((user): user is User => user !== undefined)
    }
}

export const recipeRepository: IRecipeRepository = new RecipeRepository();
