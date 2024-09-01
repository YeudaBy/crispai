import {RecipeTable} from "@/src/model/Recipe";
import {AuthorTable} from "@/src/model/Author";
import {IngredientTable} from "@/src/model/Ingredient";
import {StepTable} from "@/src/model/Step";
import {CategoryTable} from "@/src/model/Category";
import {EquipmentTable} from "@/src/model/Equipment";
import {TagTable} from "@/src/model/Tag";
import {CommentTable} from "@/src/model/RecipeComment";
import {Kysely, PostgresDialect} from "kysely";
import {Pool} from "pg";
import {AccountTable} from "@/src/model/Account";

export interface Database {
    recipe: RecipeTable,
    account: AccountTable,
    author: AuthorTable,
    ingredient: IngredientTable,
    step: StepTable,
    category: CategoryTable,
    equipment: EquipmentTable,
    tag: TagTable,
    comment: CommentTable,

    recipe_like: {
        recipe: string,
        account: string,
    },

    recipe_category: {
        recipe: string,
        category: string,
    },
}

export const dialect = new PostgresDialect({
    pool: new Pool({
        host: process.env.POSTGRES_HOST,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        user: process.env.POSTGRES_USER,
        ssl: true
    })
})

export const db = new Kysely<Database>({
    dialect
})

