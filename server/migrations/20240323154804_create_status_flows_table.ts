import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('statusFlows', t => {
        t.increments('id')
        t.integer('fromStatus').references('id').inTable('statuses').notNullable().onDelete('CASCADE')
        t.integer('toStatus').references('id').inTable('statuses').notNullable().onDelete('CASCADE')
        t.timestamp('created_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTable('statusFlows')
}

