import {defineConfig} from "kysely-ctl";
import {dialect} from "./src/other/db/db";

export default defineConfig({
    dialect,
    migrations: {
        getMigrationPrefix: () => "m",
        migrationFolder: "src/other/db",
    }
});
