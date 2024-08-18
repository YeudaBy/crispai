import {RecipeTable} from "@/src/model/Recipe";
import {AccountTable} from "@/src/model/User";
import {IngredientTable} from "@/src/model/Ingredient";
import {StepTable} from "@/src/model/Step";
import {CategoryTable} from "@/src/model/Category";
import {EquipmentTable} from "@/src/model/Equipment";
import {TagTable} from "@/src/model/Tag";
import {CommentTable} from "@/src/model/Comment";
import {Kysely, PostgresDialect} from "kysely";
import {Pool} from "pg";

export interface Database {
    recipe: RecipeTable,
    account: AccountTable,
    ingredient: IngredientTable,
    step: StepTable,
    category: CategoryTable,
    equipment: EquipmentTable,
    tag: TagTable,
    comment: CommentTable,

    recipe_like: {
        recipe_id: number,
        user_id: number,
    },
}

const dialect = new PostgresDialect({
    pool: new Pool({
        host: process.env.POSTGRES_HOST,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        user: process.env.POSTGRES_USER,
        ssl: true
    })

})

export const db = new Kysely<Database>({
    dialect,
})

