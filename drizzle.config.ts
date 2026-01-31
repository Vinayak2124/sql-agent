import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

export default defineConfig({
    schema: "./app/db/schema.ts",
    out: "./drizzle",
    dialect: "mysql",
    dbCredentials: {
        host: process.env.host!,
        port: process.env.port!,
        user: process.env.user!,
        password: process.env.password!,
        database: process.env.database!

    },
});
