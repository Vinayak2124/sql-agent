
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const pool = mysql.createPool({
    host: process.env.host,
    port: Number(process.env.port) || 3306,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});

export const db = drizzle(pool);
