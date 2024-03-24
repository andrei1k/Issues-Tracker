import { Model } from "objection";
import { BaseModel } from "./BaseModel";
import { User } from "./User";
import { Project } from "./Project";
import { Status } from "./Status";

export class Issue extends BaseModel {

    static readonly tableName = 'issues'

    description!: string
    priority!: number
    statusId!: number
    projectId!: number
    assignedTo?: number

    assignedUser?: User
    project?: Project
    status?: Status

    static get relationMappings() {

        return {
    
            assignedUser: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                from: 'issue.userId',
                to: 'users.id'
                }
            },

            project: {
                relation: Model.BelongsToOneRelation,
                modelClass: Project,
                join: {
                from: 'issue.projectId',
                to: 'projects.id'
                }
            },

            status: {
                relation: Model.BelongsToOneRelation,
                modelClass: Status,
                join: {
                from: 'issue.statusId',
                to: 'statuses.id'
                }
            },
        }
    }
}