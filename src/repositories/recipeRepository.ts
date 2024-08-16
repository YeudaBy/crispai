import { Comment } from "../model/Comment";
import {Recipe} from "@/src/model/Recipe";
import { User } from "../model/User";
import {Ingredient} from "@/src/model/Ingredient";
import {Step} from "@/src/model/Step";

export interface IRecipeRepository {
    getRecipe(id: string): Promise<Recipe>;
    getRecipesByLikes(): Promise<Recipe[]>;
    getRecipesByDate(): Promise<Recipe[]>;
    getRecipesByUser(userId: string): Promise<Recipe[]>;
    getRecipesByCategory(category: string): Promise<Recipe[]>;
    getRecipesBySearch(search: string): Promise<Recipe[]>;

    createRecipe(recipe: Recipe): Promise<Recipe>;
    updateRecipe(recipe: Recipe): Promise<Recipe>;
    deleteRecipe(id: string): Promise<void>;

    likeRecipe(id: string, userId: string): Promise<boolean>;
    unlikeRecipe(id: string, userId: string): Promise<boolean>;
    getLikedRecipes(userId: string): Promise<Recipe[]>;
    getUsersWhoLiked(id: string): Promise<User[]>;

    addComment(id: string, comment: Comment): Promise<Recipe>;
    deleteComment(id: string, commentId: string): Promise<Recipe>;

    addIngredient(id: string, ingredientId: string): Promise<Recipe>;
    deleteIngredient(id: string, ingredientId: string): Promise<Recipe>;

    addStep(id: string, step: Step): Promise<Recipe>;
    deleteStep(id: string, stepId: string): Promise<Recipe>;
    changeStepOrder(id: string, stepId: string, order: number): Promise<Recipe>;

    addImage(id: string, image: string): Promise<Recipe>;
    deleteImage(id: string, image: string): Promise<Recipe>;

    addCategory(id: string, categoryId: string): Promise<Recipe>;
    deleteCategory(id: string, categoryId: string): Promise<Recipe>;

    addTag(id: string, tagId: string): Promise<Recipe>;
    deleteTag(id: string, tagId: string): Promise<Recipe>;

    addEquipment(id: string, equipmentId: string): Promise<Recipe>;
    deleteEquipment(id: string, equipmentId: string): Promise<Recipe>;
}

class RecipeRepository implements IRecipeRepository {
    async getRecipe(id: string): Promise<Recipe> {
        // Get recipe from database
        return new Recipe();
    }

    async getRecipesByLikes(): Promise<Recipe[]> {
        // Get recipes from database
        return [new Recipe()];
    }

    async getRecipesByDate(): Promise<Recipe[]> {
        // Get recipes from database
        return [new Recipe()];
    }

    async getRecipesByUser(userId: string): Promise<Recipe[]> {
        // Get recipes from database
        return [new Recipe()];
    }

    async getRecipesByCategory(category: string): Promise<Recipe[]> {
        // Get recipes from database
        return [new Recipe()];
    }

    async getRecipesBySearch(search: string): Promise<Recipe[]> {
        // Get recipes from database
        return [new Recipe()];
    }

    async createRecipe(recipe: Recipe): Promise<Recipe> {
        // Create recipe in database
        return new Recipe();
    }

    async updateRecipe(recipe: Recipe): Promise<Recipe> {
        // Update recipe in database
        return new Recipe();
    }

    async deleteRecipe(id: string): Promise<void> {
        // Delete recipe from database
    }

    async likeRecipe(id: string, userId: string): Promise<boolean> {
        // Like recipe in database
        return true;
    }

    async unlikeRecipe(id: string, userId: string): Promise<boolean> {
        // Unlike recipe in database
        return true;
    }

    async getLikedRecipes(userId: string): Promise<Recipe[]> {
        // Get recipes from database
        return [new Recipe()];
    }

    async getUsersWhoLiked(id: string): Promise<User[]> {
        // Get users from database
        return [new User()];
    }

    async addComment(id: string, comment: Comment): Promise<Recipe> {
        // Add comment to recipe in database
        return new Recipe();
    }

    async deleteComment(id: string, commentId: string): Promise<Recipe> {
        // Delete comment from recipe in database
        return new Recipe();
    }

    async addIngredient(id: string, ingredientId: string): Promise<Recipe> {
        // Add ingredient to recipe in database
        return new Recipe();
    }

    async deleteIngredient(id: string, ingredientId: string): Promise<Recipe> {
        // Delete ingredient from recipe in database
        return new Recipe();
    }

    async addStep(id: string, step: Step): Promise<Recipe> {
        // Add step to recipe in database
        return new Recipe();
    }

    async deleteStep(id: string, stepId: string): Promise<Recipe> {
        // Delete step from recipe in database
        return new Recipe();
    }

    async changeStepOrder(id: string, stepId: string, order: number): Promise<Recipe> {
        // Change step order in recipe in database
        return new Recipe();
    }

    async addImage(id: string, image: string): Promise<Recipe> {
        // Add image to recipe in database
        return new Recipe();
    }

    async deleteImage(id: string, image: string): Promise<Recipe> {
        // Delete image from recipe in database
        return new Recipe();
    }

    async addCategory(id: string, categoryId: string): Promise<Recipe> {
        // Add category to recipe in database
        return new Recipe();
    }

    async deleteCategory(id: string, categoryId: string): Promise<Recipe> {
        // Delete category from recipe in database
        return new Recipe();
    }

    async addTag(id: string, tagId: string): Promise<Recipe> {
        // Add tag to recipe in database
        return new Recipe();
    }

    async deleteTag(id: string, tagId: string): Promise<Recipe> {
        // Delete tag from recipe in database
        return new Recipe();
    }

    async addEquipment(id: string, equipmentId: string): Promise<Recipe> {
        // Add equipment to recipe in database
        return new Recipe();
    }

    async deleteEquipment(id: string, equipmentId: string): Promise<Recipe> {
        // Delete equipment from recipe in database
        return new Recipe();
    }

}
