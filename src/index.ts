    import 'dotenv/config';
    import { eq } from 'drizzle-orm';
    import { drizzle } from 'drizzle-orm/connect';
    import { usersTable, rolsTable } from './db/schema';

    async function main() {
    const db = await drizzle("node-postgres", process.env.DATABASE_URL!);

    //Creamos un registro en la tabla 'ROLS' con el nombre 'Admin'
    const rol: typeof rolsTable.$inferInsert = {
        name: 'Admin',
    };
    await db.insert(rolsTable).values(rol);
    console.log('Rol Admin creado!');

    //Recuperamos el registro del rol 'Admin'
    const rolAdmin = await db.select().from(rolsTable).where(eq(rolsTable.name, 'Admin'));
    console.log('Rol Admin recuperado: ', rolAdmin);
    
    //Usamos el id del rol 'Admin' para crear un usuario con ese rol
    const user: typeof usersTable.$inferInsert = {
        name: 'Emanuel',
        age: 30,
        email: 'emanuel@utn.com',
        rolId:  rolAdmin[0].id
    };

    await db.insert(usersTable).values(user);
    console.log('Usuario creado!')

    const users = await db.select().from(usersTable);
    console.log('Recuperando todos los usuarios de la base de datos: ', users)

    await db
        .update(usersTable)
        .set({
        age: 31,
        })
        .where(eq(usersTable.email, user.email));
    console.log('Usuario actualizado')

    await db.delete(usersTable).where(eq(usersTable.email, user.email));
    console.log('Usuario eliminado');
    }

    main();