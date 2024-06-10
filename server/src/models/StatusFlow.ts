import { BaseModel } from "./BaseModel";

export class StatusFlow extends BaseModel {

    static readonly tableName = 'statusFlows'

    fromStatus!: number
    toStatus!: number
}