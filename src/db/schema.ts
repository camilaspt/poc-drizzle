import { AnyPgColumn, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  rolId: integer('rol_id').references((): AnyPgColumn => rolsTable.id).notNull(), //Referenciamos la tabla rols para asociar un id de rol a un usuario
});

export const rolsTable = pgTable("rols", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});