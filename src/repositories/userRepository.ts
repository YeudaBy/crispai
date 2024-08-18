import {User, UserPreview} from "../model/User";
import {db} from "../other/db";

export interface IUserRepository {
    getUser(id: number): Promise<User | undefined>;

    getUserPreview(id: number): Promise<UserPreview | undefined>;

    getUserByEmail(email: string): Promise<User | undefined>;

    createUser(
        name: string,
        email: string,
        verified: boolean,
        image?: string,
        bio?: string,
    ): Promise<number>;

    createUserWithPassword(
        name: string,
        password: string,
        email: string,
        verified: boolean,
        image?: string,
        bio?: string,
    ): Promise<number>;

    changeImage(userId: number, url: string | undefined): Promise<void>;

    changeBio(userId: number, bio: string): Promise<void>;

    changeName(userId: number, name: string): Promise<void>;

    changeEmail(userId: number, email: string): Promise<void>;

    changePassword(userId: number, password: string): Promise<void>;
}

class UserRepository implements IUserRepository {
    async getUser(id: number): Promise<User | undefined> {
        return db
            .selectFrom("account")
            .select(["id", "name", "email", "image", "bio", "verified"])
            .where("id", "=", id)
            .executeTakeFirst();

    }

    async getUserPreview(id: number): Promise<UserPreview | undefined> {
        return db
            .selectFrom("account")
            .select(["id", "name", "image", "verified"])
            .where("id", "=", id)
            .executeTakeFirst();
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        return db
            .selectFrom("account")
            .select(["id", "name", "email", "image", "bio", "verified"])
            .where("email", "=", email)
            .executeTakeFirst();
    }

    async createUser(
        name: string,
        email: string,
        verified: boolean = false,
        image?: string,
        bio?: string,
    ): Promise<number> {
        const newUser = await db
            .insertInto("account")
            .values({
                name,
                email,
                verified,
                image,
                bio,
            })
            .returning("id")
            .executeTakeFirst();

        if (!newUser) {
            throw new Error("Failed to create user");
        }

        return newUser.id;
    }

    async createUserWithPassword(
        name: string,
        password: string,
        email: string,
        verified: boolean = false,
        image?: string,
        bio?: string,
    ): Promise<number> {
        const newUser = await db
            .insertInto("account")
            .values({
                name,
                password,
                email,
                verified,
                image,
                bio,
            })
            .returning("id")
            .executeTakeFirst();

        if (!newUser) {
            throw new Error("Failed to create user");
        }

        return newUser.id;
    }

    async changeImage(userId: number, url: string | undefined): Promise<void> {
        await db
            .updateTable("account")
            .set("image", url)
            .where("id", "=", userId)
            .execute();
    }

    async changeBio(userId: number, bio: string): Promise<void> {
        await db
            .updateTable("account")
            .set("bio", bio)
            .where("id", "=", userId)
            .execute();
    }

    async changeName(userId: number, name: string): Promise<void> {
        await db
            .updateTable("account")
            .set("name", name)
            .where("id", "=", userId)
            .execute();
    }

    async changeEmail(userId: number, email: string): Promise<void> {
        await db
            .updateTable("account")
            .set("email", email)
            .where("id", "=", userId)
            .execute();
    }

    async changePassword(userId: number, password: string): Promise<void> {
        await db
            .updateTable("account")
            .set("password", password)
            .where("id", "=", userId)
            .execute();
    }
}

export const userRepository = new UserRepository();
