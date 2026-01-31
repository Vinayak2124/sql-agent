import {
    mysqlTable,
    int,
    varchar,
    decimal,
    datetime,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

/* =======================
   PRODUCT TABLE
======================= */
export const product = mysqlTable("product", {
    id: int("id").primaryKey().autoincrement(),

    name: varchar("name", { length: 255 }).notNull(),

    category: varchar("category", { length: 255 }).notNull(),

    price: decimal("price", {
        precision: 10,
        scale: 2,
    }).notNull(),

    stock: int("stock").notNull(),

    createdAt: datetime("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

/* =======================
   SALES TABLE
======================= */
export const sales = mysqlTable("sales", {
    id: int("id").primaryKey().autoincrement(),

    productId: int("product_id")
        .notNull()
        .references(() => product.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),

    quantity: int("quantity").notNull(),

    totalAmount: decimal("total_amount", {
        precision: 10,
        scale: 2,
    }).notNull(),

    saleDate: datetime("sale_date")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),

    customerName: varchar("customer_name", { length: 255 }).notNull(),

    region: varchar("region", { length: 255 }).notNull(),
});
