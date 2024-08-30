import {Account, AccountPreview} from "../model/Account";
import {db} from "../other/db/db";

export interface IUserRepository {
    getAccount(id: number): Promise<Account | undefined>;

    getAccountPreview(id: number): Promise<AccountPreview | undefined>;

    getAccountByEmail(email: string): Promise<Account | undefined>;

    getAccountIdByEmail(email: string): Promise<{ id: number } | undefined>;

    checkPassword(email: string, password: string): Promise<boolean>;

    createAccount(
        name: string,
        email: string,
        image?: string,
    ): Promise<number | undefined>;

    createAccountWithPassword(
        name: string,
        password: string,
        email: string,
        image?: string,
    ): Promise<number | undefined>;

    changeImage(userId: number, image: string | undefined): Promise<void>;

    changeName(userId: number, name: string): Promise<void>;

    changeEmail(userId: number, email: string): Promise<void>;

    changePassword(userId: number, password: string): Promise<void>;
}

class AccountRepository implements IUserRepository {
    getAccount(id: number): Promise<Account | undefined> {
        return db
            .selectFrom("account")
            .where("id", "=", id)
            .selectAll()
            .executeTakeFirst()
    }

    getAccountPreview(id: number): Promise<AccountPreview | undefined> {
        return db
            .selectFrom("account")
            .where("id", "=", id)
            .select(["id", "name", "image"])
            .executeTakeFirst()
    }

    getAccountByEmail(email: string): Promise<Account | undefined> {
        return db
            .selectFrom("account")
            .where("email", "=", email)
            .selectAll()
            .executeTakeFirst()
    }

    getAccountIdByEmail(email: string): Promise<{ id: number; } | undefined> {
        return db
            .selectFrom("account")
            .where("email", "=", email)
            .select(["id"])
            .executeTakeFirst()
    }

    checkPassword(email: string, password: string): Promise<boolean> {
        return db
            .selectFrom("account")
            .where("email", "=", email)
            .where("password", "=", password)
            .selectAll()
            .executeTakeFirst()
            .then((account) => account !== undefined)
    }

    createAccount(name: string, email: string, image?: string): Promise<number | undefined> {
        return db
            .insertInto("account")
            .values({name, email, image})
            .returning("id")
            .executeTakeFirst()
            .then((result) => result?.id)
    }

    createAccountWithPassword(name: string, password: string, email: string, image?: string): Promise<number | undefined> {
        return db
            .insertInto("account")
            .values({name, password, email, image})
            .returning("id")
            .executeTakeFirst()
            .then((result) => result?.id)
    }

    async changeImage(userId: number, image: string | undefined): Promise<void> {
        await db
            .updateTable("account")
            .set({image})
            .where("id", "=", userId)
            .execute();
    }

    async changeName(userId: number, name: string): Promise<void> {
        await db
            .updateTable("account")
            .set({name})
            .where("id", "=", userId)
            .execute();
    }

    async changeEmail(userId: number, email: string): Promise<void> {
        await db
            .updateTable("account")
            .set({email})
            .where("id", "=", userId)
            .execute();
    }

    async changePassword(userId: number, password: string): Promise<void> {
        await db
            .updateTable("account")
            .set({password})
            .where("id", "=", userId)
            .execute();
    }
}

export const userRepository = new AccountRepository();
