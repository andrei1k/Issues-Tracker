import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('issues', t => {
        t.increments('id')
        t.text('description')
        t.string('title').notNullable()
        t.integer('priority').notNullable()
        t.integer('statusId').references('id').inTable('statuses').notNullable()
        t.integer('assignedTo').references('id').inTable('users').onDelete('SET NULL')
        t.integer('projectId').references('id').inTable('projects').notNullable().onDelete('CASCADE')
        t.timestamp('created_at').defaultTo(knex.fn.now())

        t.index("priority");
        t.index("statusId");
        t.index("assignedTo");
        t.index("projectId");
    })
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTable('issues')
}

