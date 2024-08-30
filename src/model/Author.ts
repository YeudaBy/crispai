import {Generated} from "kysely";
import {AccountPreview} from "@/src/model/Account";

export type Author = {
    account: AccountPreview;
    bio?: string;
    verified: boolean;
}

export type AuthorTable = {
    account: Generated<number>;
    bio?: string;
    verified: boolean;
}
