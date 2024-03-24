import { BaseModel } from "./BaseModel";

export class StatusFlow extends BaseModel {

    static readonly tableName = 'statusFlow'

    fromStatus!: number
    toStatus!: number
}