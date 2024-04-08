import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('statuses', t => {
        t.increments('id')
        t.string('name').notNullable().unique()
        t.timestamp('created_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTable('statuses')
}
