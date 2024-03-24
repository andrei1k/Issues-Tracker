import { Model } from "objection";
import { BaseModel } from "./BaseModel";
import { Issue } from "./Issue";

export class Status extends BaseModel {

    static readonly tableName = 'statuses'

    name!: string

    issues?: Issue[]
    followingStatuses: Status[]
    previousStatuses: Status[]

    static get relationMappings() {

        return {

            issues: {
                relation: Model.HasManyRelation,
                modelClass: Issue,
                join: {
                from: 'statuses.id',
                to: 'issues.statusId'
                }
            },

            followingStatuses: {
                relation: Model.ManyToManyRelation,
                modelClass: Status,
                join: {
                from: 'statuses.id',
                through: {
                    from: 'statusFlow.fromStatus',
                    to: 'statusFlow.toStatus'
                },
                to: 'statuses.id'
                }
            },

            previousStatuses: {
                relation: Model.ManyToManyRelation,
                modelClass: Status,
                join: {
                from: 'statuses.id',
                through: {
                    from: 'statusFlow.toStatus',
                    to: 'statusFlow.fromStatus'
                },
                to: 'statuses.id'
                }
            },
        }
    }
}