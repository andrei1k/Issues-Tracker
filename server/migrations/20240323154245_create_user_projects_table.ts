import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('userProjects', t => {
        t.increments('id')
        t.integer('userId').references('id').inTable('users').notNullable().onDelete('CASCADE')
        t.integer('projectId').references('id').inTable('projects').notNullable().onDelete('CASCADE')
        t.timestamp('created_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTable('userProjects')
}