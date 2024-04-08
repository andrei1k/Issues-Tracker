import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
    await knex("projects").del();
    await knex("statuses").del();
    await knex("issues").del();
    await knex("userProjects").del();
    await knex("statusFlows").del();


    // Inserts seed entries
    await knex("users").insert([
        { email: "sereja@abv.bg", password: 'sereja444', firstName: 'Sergey', lastName: 'Mitov' },
        { email: "natashka@abv.bg", password: 'natashka444', firstName: 'Natasha', lastName: 'Dragostinova' },
        { email: "alenka@abv.bg", password: 'alenka444', firstName: 'Alena', lastName: 'Baldjieva' },
        { email: "sveta@abv.bg", password: 'Sveta444', firstName: 'Svetlana', lastName: 'Kalcheva' },
    ]);

    await knex("projects").insert([
        { title: 'WebIssueTracker' },
        { title: 'ApisMusicIndustry' },
    ]);

    await knex("statuses").insert([
        { name: 'TODO' },
        { name: 'Doing' },
        { name: 'Done' },
        { name: 'Bug' },
    ]);

    await knex("issues").insert([
        { description: 'create database', priority: 1, statusId: 2, projectId: 1, assignedTo: 4 },
        { description: 'Create server for issues', priority: 2, statusId: 1, projectId: 1 },
        { description: 'create login', priority: 1, statusId: 2, projectId: 1, assignedTo: 2 },
        { description: 'Start this hard sad project', priority: 1, statusId: 1, projectId: 2},
    ]);

    await knex("userProjects").insert([
        { userId: 1, projectId: 2 },
        { userId: 2, projectId: 1 },
        { userId: 4, projectId: 1 },
        { userId: 4, projectId: 2 },
    ]);

    await knex("statusFlows").insert([
        { fromStatus: 1, toStatus: 2 },
        { fromStatus: 2, toStatus: 3 },
        { fromStatus: 3, toStatus: 4 },
        { fromStatus: 2, toStatus: 4 },
    ]);
};