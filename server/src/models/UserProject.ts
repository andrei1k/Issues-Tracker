import { BaseModel } from "./BaseModel";

export class UserProject extends BaseModel {

    static readonly tableName = 'userProjects'

    userId!: number
    projectId!: number  
}