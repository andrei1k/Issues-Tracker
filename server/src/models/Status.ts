import { Model } from "objection";
import { BaseModel } from "./BaseModel";
import { Issue } from "./Issue";

export class Status extends BaseModel {

    static readonly tableName = 'statuses'

    name!: string

    issues?: Issue[]
    followingStatuses?: Status[]
    previousStatuses?: Status[]

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
                    from: 'statusFlows.fromStatus',
                    to: 'statusFlows.toStatus'
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
                    from: 'statusFlows.toStatus',
                    to: 'statusFlows.fromStatus'
                },
                to: 'statuses.id'
                }
            },
        }
    }
}