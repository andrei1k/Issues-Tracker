import { Model } from "objection";
import { BaseModel } from "./BaseModel";
import { Project } from "./Project";
import { Issue } from "./Issue";

export class User extends BaseModel {

    static readonly tableName = 'users'

    email!: string
    password!: string
    firstName!: string
    lastName!: string

    projects?: Project[]
    issues?: Issue[]

    static get relationMappings() {

        return {
    
            projects: {
                relation: Model.ManyToManyRelation,
                modelClass: Project,
                join: {
                from: 'users.id',
                through: {
                    from: 'userProjects.userId',
                    to: 'userProjects.projectId'
                },
                to: 'projects.id'
                }
            },

            issues: {
                relation: Model.HasManyRelation,
                modelClass: Issue,
                join: {
                from: 'users.id',
                to: 'issues.assignedTo'
                }
            },
        }
    }
}