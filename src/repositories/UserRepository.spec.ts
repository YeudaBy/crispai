import {after, afterEach, before, describe, it} from "node:test";
import {db} from "@/src/other/db";
import {sql} from "kysely";
import {userRepository} from "@/src/repositories/userRepository";

describe("UserRepository", () => {
    before(async () => {
        await db.schema.createTable("user")
            .addColumn("id", "serial", cb => cb.primaryKey())
            .addColumn("name", "varchar")
            .addColumn("email", "varchar")
            .addColumn("image", "varchar")
            .addColumn("bio", "text")
            .addColumn("verified", "boolean", cb => cb.notNull().defaultTo(false))
            .execute();
    });

    after(async () => {
        await db.schema.dropTable("user").execute();
    });

    afterEach(async () => {
        await sql`truncate table ${sql.table('user')}`.execute(db)
    })

    it("should create a user", async () => {
        const id = await userRepository.createUser("Test User",
            "test", false, "test", "test");
        const user = await userRepository.getUser(id);
    })

})
