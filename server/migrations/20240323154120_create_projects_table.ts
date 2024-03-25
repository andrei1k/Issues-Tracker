import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('projects', t => {
        t.increments('id')
        t.string('title').notNullable()
        t.timestamp('created_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTable('projects')
}