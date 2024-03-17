import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('users', t => {
        t.increments('id')
        t.string('username')
        t.string('password')
        t.string('firstName')
        t.string('lastName')
        t.timestamp('created_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTable('users')
}

