import { Model } from "objection";
import { BaseModel } from "./BaseModel";
import { User } from "./User";
import { Issue } from "./Issue";

export class Project extends BaseModel {

    static readonly tableName = 'projects'

    title!: string

    users?: User[]
    issues?: Issue[]

    static get relationMappings() {

        return {
    
            projects: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                from: 'projects.id',
                through: {
                    from: 'userProjects.userId',
                    to: 'userProjects.projectId'
                },
                to: 'users.id'
                }
            },

            issues: {
                relation: Model.HasManyRelation,
                modelClass: Issue,
                join: {
                from: 'projects.id',
                to: 'issues.projectId'
                }
            },
        }
    }
}