import {Kysely, sql} from "kysely"

export async function up(db: Kysely<any>): Promise<void> {

    await db.schema
        .createTable("account")
        .addColumn("id", "char(8)", (col) =>
            col.primaryKey().defaultTo(sql`short_uuid
                ()`)
        )
        .addColumn("name", "text")
        .addColumn("email", "text", (col) => col.unique().notNull())
        .addColumn("image", "text")
        .addColumn("password", "text")
        .execute()

    await db.schema
        .createTable("author")
        .addColumn("account", "char(8)", (col) =>
            col.references("account.id").onDelete("cascade").notNull()
        )
        .addColumn("verified", "boolean", (col) => col.notNull().defaultTo(false))
        .addColumn("bio", "text")
        .execute()

    await db.schema
        .createTable("recipe")
        .addColumn("id", "char(8)", (col) => col.primaryKey().defaultTo(sql`short_uuid
            ()`)
        )
        .addColumn("account", "char(8)", (col) =>
            col.references("account.id").onDelete("cascade").notNull()
        )
        .addColumn("title", "text", (col) => col.notNull())
        .addColumn("description", "text")
        .addColumn("main_image", "text")
        .addColumn("date", "timestamptz", (col) => col.notNull())
        .addColumn("avgEstimate", "float4")
        .execute()

    await db.schema
        .createTable("comment")
        .addColumn("id", "char(8)", (col) =>
            col.primaryKey().defaultTo(sql`short_uuid
                ()`)
        )
        .addColumn("account", "char(8)", (col) =>
            col.references("account.id").onDelete("cascade").notNull()
        )
        .addColumn("recipe", "char(8)", (col) =>
            col.references("recipe.id").onDelete("cascade").notNull()
        )
        .addColumn("content", "text")
        .addColumn("date", "timestamptz", (col) => col.notNull())
        .addColumn("likes", "int8")
        .addColumn("author_reply", "text")
        .addColumn("author_like", "boolean")
        .addColumn("pined", "boolean")
        .execute()

    // add category table
    await db.schema
        .createTable("category")
        .addColumn("id", "char(8)", (col) =>
            col.primaryKey().defaultTo(sql`short_uuid
                ()`)
        )
        .addColumn("name", "text")
        .addColumn("image", "text")
        .execute()

    await db.schema
        .createTable("recipe_category")
        .addColumn("recipe", "char(8)", (col) =>
            col.references("recipe.id").onDelete("cascade").notNull()
        )
        .addColumn("category", "char(8)", (col) =>
            col.references("category.id").onDelete("cascade").notNull()
        )
        .execute()

    // add recipe_like table
    await db.schema
        .createTable("recipe_like")
        .addColumn("account", "char(8)", (col) =>
            col.references("account.id").onDelete("cascade").notNull()
        )
        .addColumn("recipe", "char(8)", (col) =>
            col.references("recipe.id").onDelete("cascade").notNull()
        )
        .execute()

    await db.schema
        .createIndex('idx_account_email')
        .on('account')
        .column('email')
        .execute()

    await db.schema
        .createIndex('idx_author_account')
        .on('author')
        .column('account')
        .execute()

    await db.schema
        .createIndex('idx_recipe_account')
        .on('recipe')
        .column('account')
        .execute()

    await db.schema
        .createIndex('idx_recipe_date')
        .on('recipe')
        .column('date')
        .execute()

    await db.schema
        .createIndex('idx_comment_recipe')
        .on('comment')
        .column('recipe')
        .execute()


    await db.schema
        .createIndex('idx_recipe_category_recipe')
        .on('recipe_category')
        .column('recipe')
        .execute()

    await db.schema
        .createIndex('idx_recipe_category_category')
        .on('recipe_category')
        .column('category')
        .execute()

    await db.schema
        .createIndex('idx_recipe_like_account')
        .on('recipe_like')
        .column('account')
        .execute()

    await db.schema
        .createIndex('idx_recipe_like_recipe')
        .on('recipe_like')
        .column('recipe')
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("recipe_category").execute()
    await db.schema.dropTable("recipe_like").execute()
    await db.schema.dropTable("category").execute()
    await db.schema.dropTable("comment").execute()
    await db.schema.dropTable("recipe").execute()
    await db.schema.dropTable("author").execute()
    await db.schema.dropTable("account").execute()

}
